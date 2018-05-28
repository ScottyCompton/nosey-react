import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { load as loadHeroChannels } from 'redux/modules/hero';
import { updateProgressBar } from 'redux/modules/progress';

import HeroSlide from './HeroSlide';
import Slider from 'react-slick'; // slick slider

@connect(state => ({
    token: state.apiAccess.token,
    countryCode: state.apiAccess.countryCode,
    channels: state.hero.channels,
    progress: state.progress
  }), { loadHeroChannels, updateProgressBar }
)

export default class Hero extends Component {
  static propTypes = {
    loadHeroChannels: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    countryCode: PropTypes.string.isRequired,
    category: PropTypes.string,
    channels: PropTypes.array,
    updateProgressBar: PropTypes.func.isRequired,
    progress: PropTypes.object,
    loaded: PropTypes.bool,
    error: PropTypes.object
  };

  componentWillMount() {

  }

  componentDidMount() {
    const { category, token, countryCode } = this.props;
    this.props.loadHeroChannels(category, token, countryCode);
    this.props.updateProgressBar(10);
  }

  componentWillUnmount() {
    // FeaturedCarouselStore.removeListener("change");
  }

  render() {
    const { channels } = this.props;
    const styles = require('./style.less');

    // Iterate over channels making a single slide/card out of each one
    const Cards = [];
    if (channels && channels.length && channels[0] && channels[0].playlist) {
      channels[0].playlist.map((video) => {
        Cards.push(
          <div key={video._id}>
            <HeroSlide {...video} categorySlug={channels[0].categories[0].slug} channelSlug={channels[0].slug}/>
          </div>
        );
      });
    } else {
      Cards.push(<div key="0"></div>);
    }

    // Get config for slider
    const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 2500,
      autoplaySpeed: 7000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      arrows: false,
      dotsClass: 'slick-dots heroDots',
    };

    // render method
    return (
      <div className="hero">
        <Slider {...sliderSettings}>
          {Cards}
        </Slider>
      </div>
    );
  }
}
