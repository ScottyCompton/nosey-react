import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import jwtDecode from 'jwt-decode';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Rail from 'components/Rails/Rail';
import Comments from '../../components/Comments/Comments';
import Util from '../../helpers/Util';
import AuthService from '../../utils/AuthService';
/* Actions */
import { load as loadSeasonChannels } from 'redux/modules/ivp';
/* Component */
import MoreLikeThis from '../../components/MoreLikeThis/MoreLikeThis';
import PlayerDisplay from '../../components/Player/Player';
// import RailComponentMoreLikeThis from "../components/MoreLikeThis/Rail";
import config from '../../config';

// connect to the store so we can get/retrieve token
@connect(state => ({
    countryCode: state.apiAccess.countryCode,
    token: state.apiAccess.token,
    channels: state.ivp.channels,
    error: state.ivp.error,
    loaded: state.ivp.loaded
  }), { loadSeasonChannels }
)

export default class IVP extends Component {
  static propTypes = {
    loadSeasonChannels: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    params: PropTypes.object.isRequired,
    countryCode: PropTypes.string.isRequired,
    channels: PropTypes.array,
    loaded: PropTypes.bool,
    error: PropTypes.object,
    location: PropTypes.object,
    history: PropTypes.object
  };

  componentDidMount() {
    const { token, countryCode, params } = this.props;

    // If this is a resume page (/video/:video), we don't need to load channels
    if (this.props.params.video && !this.props.params.category && !this.props.params.slug) {
      return;
    }

    this.props.loadSeasonChannels(token, countryCode, params.slug, (params.childSlug || ""));
  }

  getClientToken() {
    return this.auth.getSpotlightToken();
  }

  render() {
    // Util.redirectIfFirstTimeVisitor();

    const styles = require('./style.less');
    const railStyles = require('../../components/Rails/style.less');
    const slickStyles = require('../../components/Rails/slick.less');
    const slickTheme = require('../../components/Rails/slick.theme.less');
    let shareURL = config.live.domain + this.props.location.pathname;

    const { channels, loaded, token, countryCode, params } = this.props;
    // We check to see if there is only one channel that comes back, and if it has child channels.  If so, it's a parent.
    const isParentChannel = channels && channels.length < 2 && channels[0] && channels[0]._id !== "0" && channels[0].childchannels && channels[0].childchannels.length > 0;
    // iterate over channels in grid making a single grid "item" from each one

    if (typeof window === 'undefined') {
      return <div/>;
    }

    if (!this.auth) {
      this.auth = new AuthService();
    }

    let Seasons = [];
    let Player;
    let pageTitle;
    let pageDescription;
    let previousVideo;
    let nextVideo;
    let videoId;
    let percentage = 0;
    let MLT = "";
    let userId = {};
    const clientToken = this.getClientToken();
    // Get user info to send to player if we have any
    if (this.auth.loggedIn() && clientToken.length > 0) {
      userId = jwtDecode(clientToken);
    }

    let canonicalURL = "https://www.nosey.com/channel/" + this.props.params.slug;
    if (this.props.params.childSlug) canonicalURL = canonicalURL + "/" + this.props.params.childSlug;

    if (params.video) {
      videoId = params.video;
      canonicalURL = canonicalURL + "/video/" + videoId;
    } else if (loaded) {
      if (isParentChannel) {
        videoId = channels[0].childchannels[0].playlist[0]._id;
      } else if (channels[0]) {
        videoId = channels[0].playlist[0]._id;
      } else {
        videoId = 0;
      }
    }
    // browserHistory.push(`/get-the-app/${videoId}`);

    if (Util.isMobile() && videoId) {
      browserHistory.push(`/get-the-app/${videoId}`);
      return (<div/>);
    }
    if (channels && channels.length > 0 && loaded) {
      const mappableSeasons = isParentChannel ? channels[0].childchannels : channels;
      const parentPath = channels[0].slug !== "more-like-this" ? "/channel/" + channels[0].slug : "/more-like-this/more-like-this";

      if (channels[0].slug !== "more-like-this") {
        MLT = <MoreLikeThis videoId={videoId} location={this.props.location}/>;
      }

      const companyId = channels[0].spotlight_company_id;

      // hacky manual override for Hero channel
      pageTitle = channels[0].title === "Hero" ? "Spotlight" : channels[0].title;
      const thisSeries = pageTitle;

      // new SEO requirements for IVP page title and description given by Jerome
      pageDescription = "Watch " + pageTitle + " online. Stream episodes, browse various seasons and much more. Find " + pageTitle + " videos & exclusive content, only with Nosey!";
      pageTitle = "Watch " + pageTitle + " Episodes Online";
      let chans = mappableSeasons;
      for (let a = 0; a < mappableSeasons.length; a++) {
        // If we are in a parent channel, we check each  child channel's playlist
        if (!mappableSeasons.playlist) chans = mappableSeasons[a];
        for (let b = 0; b < chans.playlist.length; b++) {
          // If the current video we are on matches the video in the iteration, we know we are on the ball.
          if (chans.playlist[b]._id === videoId) {
            if (chans.playlist[b].episode) {
              pageTitle = "Watch " + thisSeries + " - Episode " + chans.playlist[b].episode + " " + chans.playlist[b].title + " Episodes Online";
            } else {
              pageTitle = "Watch " + thisSeries + " - " + chans.playlist[b].title + " Episodes Online";
            }

            // canonical URL needs to be changed if preferred_channel property exists
            if (chans.playlist[b].preferred_channel) {
              canonicalURL = config.live.domain + "/channel/" + chans.playlist[b].preferred_channel + "/video/" + chans.playlist[b]._id;
            }

            // Default to assume we aren't at the end or beginning of a season
            previousVideo = chans.playlist[b - 1] ? parentPath + "/video/" + chans.playlist[b - 1]._id : "";
            nextVideo = chans.playlist[b + 1] ? parentPath + "/video/" + chans.playlist[b + 1]._id : "";
            // If we are at the end of a season, we check to see if there is another season
            if (!chans.playlist[b + 1] && mappableSeasons[a + 1] && isParentChannel) {
              nextVideo = mappableSeasons[a + 1].playlist[0] ? parentPath + "/video/" + mappableSeasons[a + 1].playlist[0]._id : "";
              previousVideo = chans.playlist[b - 1] ? parentPath + "/video/" + chans.playlist[b - 1]._id : "";
            } else if (!chans.playlist[b - 1] && mappableSeasons[a - 1] && isParentChannel) { // If we are at the beginning of the season, see if there are prior seasons
              nextVideo = chans.playlist[b + 1] ? parentPath + "/video/" + chans.playlist[b + 1]._id : "";
              previousVideo = mappableSeasons[a - 1].playlist[mappableSeasons[a - 1].playlist.length - 1] ? parentPath + "/video/" + mappableSeasons[a - 1].playlist[mappableSeasons[a - 1].playlist.length - 1]._id : "";
            }
          }
        }

        Seasons.push(<Rail key={"ivp" + a} name={chans.title} slug={params.category || chans.slug}
                           channel_slug={params.slug || ""} content={chans}
                           token={token} progressPercentage={percentage} parentPath={parentPath}
                           isParentChannel={isParentChannel} current={videoId} location={this.props.location.pathname}
                           videoId={videoId}/>);
      }

      Player = (<PlayerDisplay video_id={videoId}
                               nextVideo={nextVideo}
                               previousVideo={previousVideo}
                               historyObj={this.props.history}
                               locationObj={this.props.location}
                               userId={userId.context && userId.context.id ? userId.context.id : ""}
                               continueFrom={this.props.location.query.t || 0}/>);

      // Seasons = <RailSeasons seasons={mappableSeasons} parentPath={parentPath} current={videoId} isParentChannel={isParentChannel} />
    } else {
      if (videoId) {
        Player = (<PlayerDisplay
          video_id={videoId}
          nextVideo={""}
          previousVideo={""}
          historyObj={this.props.history}
          locationObj={this.props.location}
          userId={userId.context && userId.context.id ? userId.context.id : ""}
          continueFrom={this.props.location.query.t || 0}/>);

        // other stuff in the render method
        pageTitle = "Results";
        MLT = <MoreLikeThis/>;
      }
    }

    return (
      <div key="seasonRailContainer">
        {this.props.loaded && <Helmet
          title={pageTitle}
          meta={[
            { name: 'title', content: pageTitle },
            { property: 'og:title', content: pageTitle },
            { property: 'og:url', content: shareURL },
          ]}
          link={[{rel: 'canonical', content: canonicalURL}]}
        />}
        {Player}

        <div className="rails-container row">
          <div className="col-md-12">
            {Seasons}
            {MLT}
          </div>
        </div>
        <div className="comments-container row" style={{ backgroundColor: '#000' }}>
          <div className="col-md-1"/>
          <div className="col-md-10">
            <Comments location={shareURL}/>
          </div>
          <div className="col-md-1"/>
        </div>
      </div>
    );
  }
}
