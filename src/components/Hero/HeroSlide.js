import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import ImageLoader from 'react-imageloader';
import { RectShape, TextBlock } from 'react-placeholder/lib/placeholders';
import RaisedButton from 'material-ui/RaisedButton';
import ActionPlay from 'material-ui/svg-icons/av/play-circle-outline';
import Preloader from './HeroSlidePlaceholder';
const heroPreloadImg = require('../../../static/images/heroleftloader.jpg');
const heroTransImg = require('../../../static/images/300x168.png');
const PlaceHolderStyle = require('./HeroSlidePlaceholder.less');

const styles = {
  button: {
    marginTop: 30,
  },
};

export default class HeroSlide extends Component {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    thumb: PropTypes.string,
    wallpaper: PropTypes.string,
    categorySlug: PropTypes.string,
    channelSlug: PropTypes.string,
    _id: PropTypes.string,
    preloadText: PropTypes.string,
    seriestitle: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  slidePreloader() {
    return (
      <Preloader preloadText={"I exist!"}/>
    );
  }

  wordCount(strIn) {
    let aryWords = strIn.split(" ");
    let wordCount = 50;
    if (aryWords.length <= wordCount) {
      return strIn;
    }
    let aryOut = aryWords.splice(0, aryWords.length - wordCount);
    let strOut = aryOut.join(" ");
    return strOut;
  }

  noSeriesImgAvailable() {
    return (
      <div className="hero-series-title">
        <h2>{this.props.seriestitle}</h2><br />
      </div>
    );
  }

  render() {
    const { wallpaper } = this.props;
    const imageUrl = wallpaper ? "//image.dotstudiopro.com/" + wallpaper + "/150" : "www.placehold.it/150x150";
    let aryWords = this.props.description.split(" ");
    let wordCount = 50;
    let strDesc = this.props.description;
    if (aryWords.length >= wordCount) {
      let aryOut = aryWords.splice(0, wordCount);
      strDesc = aryOut.join(" ") + '...';
    }

    return (
      <span>
      <div className="row heroContainer ">
        <div className="col-md-6 col-xs-12">
          <div className="heroImage">
              <div className="heroMask"></div>
              <ImageLoader imgProps={{ width: '100%', height: 'auto' }} preloader={this.slidePreloader}
                           src={"//image.dotstudiopro.com/" + this.props.thumb + "/856/482"}/>
          </div>
        </div>
        <div className="col-md-6 col-xs-12">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="heroMeta">
                <ImageLoader style={{ float: 'left', 'marginRight': '5%' }} preLoader={this.logoPreloader}
                             src={imageUrl}>
                  {this.noSeriesImgAvailable()}
                </ImageLoader>
                <h1 className="heroTitle">{this.props.title}</h1>
                <div className="heroText">{strDesc}</div>
                <RaisedButton
                  href={"/" + this.props.categorySlug + "/" + this.props.channelSlug + "/video/" + this.props._id}
                  label="Watch Episode"
                  labelColor="#61F061"
                  backgroundColor="#212432"
                  className="watch-now-button"
                  style={styles.button}
                  icon={<ActionPlay />}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </span>
    );
  }
}
