import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import 'babel-polyfill';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';
import { loadPlaylist as loadPlaylistBySlug } from 'redux/modules/home';
import { updateProgressBar } from 'redux/modules/progress';

import RailSlide from 'components/Rails/RailSlide'; // individual element in the rail
import RailPrevNextArrow from './RailPrevNextArrow';
import AuthService from '../../utils/AuthService';
import Slider from 'react-slick'; // slick slider

// const Loading = require('react-loading-animation');

// connect so we can use dispatch actions and listen for playlist events
@connect(state => ({
    token: state.apiAccess.token,
    countryCode: state.apiAccess.countryCode,
    loadingPlaylistData: state.home.loading_playlists,
    loadedPlaylistData: state.home.loaded_playlists,
    progress: state.progress,
    railPlaylists: state.home,
    continueWatching: state.points.started,
    watchAgain: state.points.complete,
    loadedPoints: state.points.loaded
  }), { loadPlaylistBySlug, updateProgressBar }
)

export default class Rail extends Component {
  static propTypes = {
    token: PropTypes.string.isRequired,
    content: PropTypes.object.isRequired,
    countryCode: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    channel_slug: PropTypes.string,
    loadPlaylistBySlug: PropTypes.func.isRequired,
    loadingPlaylistData: PropTypes.bool,
    loadedPlaylistData: PropTypes.bool,
    updateProgressBar: PropTypes.func.isRequired,
    pointData: PropTypes.array,
    progress: PropTypes.object,
    progressPercentage: PropTypes.number,
    loaded: PropTypes.bool,
    error: PropTypes.object,
    name: PropTypes.string,
    location: PropTypes.string,
    videoId: PropTypes.string,
    railPlaylists: PropTypes.object,
    loadedPoints: PropTypes.bool,
    watchAgain: PropTypes.array,
    continueWatching: PropTypes.array,
    height: PropTypes.string
  };

  componentDidMount() {
    const { progressPercentage } = this.props;

    this.props.updateProgressBar(progressPercentage);
  }

  componentWillReceiveProps() {
    const { content, slug, loadingPlaylistData, loadedPoints, pointData } = this.props;
    if (content) {
      const needsPlaylist = (typeof content.channels !== 'undefined' && content.channels[0]._id !== "0" && content.channels.length === 1);
      if (needsPlaylist && !loadingPlaylistData) this.requestPlaylistData();
    }
  }

  getSliderSettings(slideCount) {
    let windowWidth = 1920;
    if (typeof window !== 'undefined') {
      windowWidth = window.innerWidth;
    }
    // The inifinite property on the slider must be set to false if we have less than 5 thumbs
    // otherwise it causes rendering issues
    let infinite = false;
    let prevArrow = <div/>;
    let nextArrow = <div/>;
    if (slideCount >= 2) {
      infinite = true;
    }
    if (windowWidth >= 1400 && slideCount > 5) {
      prevArrow = <RailPrevNextArrow whichArrow={'left'}/>;
      nextArrow = <RailPrevNextArrow whichArrow={'right'}/>;
    } else if (windowWidth >= 1024 && slideCount > 4) {
      prevArrow = <RailPrevNextArrow whichArrow={'left'}/>;
      nextArrow = <RailPrevNextArrow whichArrow={'right'}/>;
    } else if (windowWidth < 1023 && slideCount > 3) {
      prevArrow = <RailPrevNextArrow whichArrow={'left'}/>;
      nextArrow = <RailPrevNextArrow whichArrow={'right'}/>;
    }
    return {
      dots: false,
      infinite: infinite,
      speed: 1500,
      slidesToShow: 5,
      slidesToScroll: 5,
      prevArrow: prevArrow,
      nextArrow: nextArrow,
      responsive: [{
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      }, {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }, {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      }]
    };
  }

  requestPlaylistData() {
    const { content, token, countryCode, slug, loadingPlaylistData, progressPercentage } = this.props;
    if (content) {
      if (!loadingPlaylistData && content.channels.length === 1 && content.channels[0]._id !== "0") {
        this.props.loadPlaylistBySlug(token, countryCode, slug);
      }
    }
  }

  render() {
    const { name, content, loadingPlaylistData, loadedPlaylistData, progressPercentage, videoId, railPlaylists, slug, loadedPoints, pointData } = this.props;

    if (typeof window === 'undefined') {
      return <div/>;
    }

    if (!this.auth) {
      this.auth = new AuthService();
    }

    let categoryUrl = '';
    let Cards = [];
    let channelSlug = "";
    // these are regular rails (ie one built from DSP channel data)
    if (content && Object.keys(content).length > 0) {
      let myChannels = content;

      if (typeof content.channels === 'undefined' && typeof this.props.content.playlist !== 'undefined') {
        myChannels = Object.assign(content, { channels: this.props.content.playlist });
      } else if (typeof railPlaylists[slug] !== 'undefined' && content.channels[0]._id !== "0") {
        // For the Trending and Hits of the Week rails
        myChannels = Object.assign(content, { channels: railPlaylists[slug].results });
      }

      // iterate over contents making a single slide/card out of each one
      if (myChannels && myChannels.channels && myChannels.channels.length > 0) {
        myChannels.channels.map((channel, index) => {
          // channels containing video content need some property overrides
          // since playlist data structure is different from channel data structure
          let url = channel.videoUrl ? channel.videoUrl : "/" + this.props.slug + "/" + channel.slug;
          const isSingleChannel = channel.categories || channel.childchannels ? false : true;
          if (isSingleChannel) {
            channelSlug = "/" + this.props.slug + "/" + channel.channel_slug;
            if (!channel.channel_slug) channelSlug = "/" + this.props.slug + "/" + this.props.channel_slug;
          }
          const seriesTitle = channel.seriesTitle ? channel.seriesTitle : null;

          let poster = '';
          if (typeof channel.spotlight_poster !== 'undefined') {
            poster = channel.spotlight_poster + '/300/170';
          } else if (typeof channel.thumb !== 'undefined') {
            if (channel.thumb.indexOf('thumb_1.jpg') > -1) {
              poster = "//image.dotstudiopro.com/" + channel.thumbs[0] + '/300/170';
            } else {
              poster = "//image.dotstudiopro.com/" + channel.thumb + '/300/170';
            }
          }

          let percentageWatched = null;
          let startTime = 0;
          if (loadedPoints && this.auth.loggedIn()) {
            const { watchAgain, continueWatching } = this.props;
            if (continueWatching) {
              for (let i = 0; i < continueWatching.length; i++) {
                if (continueWatching[i]._id === channel.id) {
                  percentageWatched = (continueWatching[i].point / continueWatching[i].duration).toFixed(2);
                  startTime = continueWatching[i].point;
                }
              }
            }
            if (watchAgain && percentageWatched === null) {
              for (let i = 0; i < watchAgain.length; i++) {
                if (watchAgain[i]._id === channel.id) {
                  percentageWatched = (watchAgain[i].point / watchAgain[i].duration).toFixed(2);
                  startTime = watchAgain[i].point;
                }
              }
            }
          }
          const floatPercentage = parseFloat(percentageWatched);

          if (isSingleChannel && !channel.videoUrl && this.props.location) {
            // IVP-related; get the current path and append video id for links, ensuring we don't append twice
            url = this.props.location.indexOf("/video/") > -1 ? this.props.location.split("/video/")[0] + "/video/" + channel._id : this.props.location + "/video/" + channel._id;
          }

          categoryUrl = channelSlug.length > 0 ? channelSlug : "/" + this.props.slug;

          Cards.push(
            <div id={channel._id} key={index}>
              <RailSlide
                slideId={channel.id}
                poster={poster}
                url={url}
                title={channel.title}
                isSingleChannel={isSingleChannel}
                seriesTitle={seriesTitle}
                selected={videoId && videoId === channel._id || false}
                percentageWatched={floatPercentage}
                startTime={startTime}
              />
            </div>
          );
        });
      } else {
        for (let i = 0; i <= 4; i++) {
          Cards.push(<div key={i + 1}><RailSlide /></div>);
        }
      }
    } else if (pointData && pointData.length > 0 && loadedPoints) {
      pointData.map((video, index) => {
        const posterUrl = "https://f9q4g5j6.ssl.hwcdn.net/" + video.thumb + "/300/170";
        const percentageWatched = (video.point / video.duration).toFixed(2);
        const startTime = video.point ? video.point : 0;
        const floatPercentage = parseFloat(percentageWatched);
        const url = "/video/" + video._id;
        Cards.push(
          <div id={video._id} key={index + 1}>
            <RailSlide
              slideId={video._id}
              poster={posterUrl}
              title={video.title}
              url={url}
              isSingleChannel
              seriesTitle={video.seriestitle}
              selected={false}
              percentageWatched={floatPercentage}
              startTime={startTime}
            />
          </div>
        );
      });
    } else {
      for (let i = 0; i <= 4; i++) {
        Cards.push(<div key={i + 1}><RailSlide /></div>);
      }
    }

    // Get config for slider
    const settings = this.getSliderSettings(Cards.length);

    // terrible hacky override for Hero rail...
    const manualOverrideName = name === "Hero" ? "Spotlight" : name;

    return (
      <div className="rail-slider">
        <Link to={categoryUrl}>
          <h2><FormattedMessage id={name}
                                defaultMessage={content.category ? content.category.name : manualOverrideName}/></h2>
        </Link>

        <Slider {...settings}>
          {Cards}
        </Slider>
      </div>
    );
  }
}
