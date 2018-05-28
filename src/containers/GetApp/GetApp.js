import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory, connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { loadIVPVideo } from 'redux/modules/player';
import Helmet from 'react-helmet';
import { isLoaded as isApiAccessLoaded, load as loadApiAccess } from 'redux/modules/apiAccess';
import config from '../../config';
import Util from '../../helpers/Util';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import theme from 'theme/theme';
import ImageLoader from 'react-imageloader';
import Preloader from '../../components/Rails/RailSlidePlaceholder';
import ReactGA from 'react-ga';

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];

    if (!isApiAccessLoaded(getState())) {
      promises.push(dispatch(loadApiAccess()));
    }

    return Promise.all(promises);
  }
}])

@connect(state => ({
    videoObj: state.player.video,
    loading: state.player.loading,
    token: state.apiAccess.token,
    error: state.player.error,
    countryCode: state.apiAccess.countryCode
  }), { loadIVPVideo }
)
export default class GetApp extends Component {
  static propTypes = {
    loadIVPVideo: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    countryCode: PropTypes.string,
    params: PropTypes.object.isRequired,
    videoObj: PropTypes.object
  };

  componentWillMount() {
    const { token, countryCode, params } = this.props;

    const videoId = params.video;
    this.props.loadIVPVideo(token, videoId);
  }

  thumbPreloader() {
    return (
      <Preloader />
    );
  }

  AppStoreGA() {
    ReactGA.event({
      category: 'Play',
      action: 'AppDownload',
      label: "AppStore",
      nonInteraction: true
    });
  }

  PlayStoreGA() {
    ReactGA.event({
      category: 'Play',
      action: 'AppDownload',
      label: "AppStore",
      nonInteraction: true
    });
  }


  render() {
    const getAppStyles = require('./GetApp.less');
    const { videoObj } = this.props;
    const geoCheck = videoObj.geocheck ? true : videoObj.geoCheck;

    let imageSrcPortrait = '';
    let imageSrcLandscape = '';
    let imageSrc = '';
    if (videoObj && videoObj.thumb) {
      imageSrcPortrait = geoCheck ? videoObj.thumb : '//image.dotstudiopro.com/' + videoObj.thumb + '/300/170';
      imageSrcLandscape = geoCheck ? videoObj.thumb : '//image.dotstudiopro.com/' + videoObj.thumb + '/1400/787';
      imageSrc = geoCheck ? videoObj.thumb : '//image.dotstudiopro.com/' + videoObj.thumb + '/1400/787';
    }


    let logoSrc = 'nothing.jpg';
    if (videoObj && videoObj.wallpaper) {
      logoSrc = '//image.dotstudiopro.com/' + videoObj.wallpaper;
    }

    const appUrl = Util.isIOS() ? config.app.links.ios : config.app.links.android;

    let winWidth = window.innerWidth;
    let winHeight = window.innerHeight;
    let imgHeight = '';
    if (winWidth > winHeight) {
      imgHeight = winHeight + 'px';
    } else {
      imgHeight = winWidth + 'px';
    }

    const portraitViewImgStyle = {
      'background-image': 'url(' + imageSrc + ')',
      'height': imgHeight,
    };

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
        <div className="getapp-content">
 			<Helmet title="Get the App"/>
 			<div className="getapp-container portrait-view">

        <div className="row nopad">
            <div className="col-xs-12 nopad">
   						<div className="seriesImgOrTitle">
   						  <ImageLoader src={logoSrc} className="logo-container">
   						  <div className="seriesTitle">{videoObj.seriestitle}</div>
   						  </ImageLoader>
   						</div>
   						<div className="video-image">
   						  <div className="thumb-grad thumb-upper-grad"></div>
   						  <ImageLoader src={imageSrc} className="img-responsive" preloader={this.thumbPreloader} />
   						  <div className="thumb-grad thumb-lower-grad"></div>
   						</div>
            </div>
        </div>
        <div className="row nopad">
            <div className="col-xs-12 nopad">
   						<div className="get-the-app">
   							{videoObj.title &&
   							(
   							  <h2>&ldquo;{videoObj.title}&rdquo;</h2>
   							)}
   							<h1>Watch <span className="brand">Nosey</span> on your phone or tablet</h1>
   							<a className="btn btn-primary" href={appUrl}>GET THE FREE APP</a>
   						</div>
            </div>
          </div>
 			</div>

      <div className="getapp-container landscape-view">

        <div className="row nopad">
            <div className="col-xs-6 nopad">

              <div className="video-image"  style={portraitViewImgStyle}>
   						  <div className="thumb-grad thumb-upper-grad"></div>
   						  <div className="thumb-grad thumb-lower-grad"></div>
   						</div>
            </div>
            <div className="col-xs-6 nopad">
              <div className="seriesImgOrTitle">
   						  <ImageLoader src={logoSrc} className="logo-container">
   						  <div className="seriesTitle">{videoObj.seriestitle}</div>
   						  </ImageLoader>
   						</div>
   						<div className="get-the-app">
   							{videoObj.title &&
   							(
   							  <h2>&ldquo;{videoObj.title}&rdquo;</h2>
   							)}
   							<h1>Watch <span className="brand">Nosey</span> on your phone or tablet</h1>
   							<a className="btn btn-primary" href={appUrl} onClick={Util.isIOS() ? this.AppStoreGA : this.PlayStoreGA}>GET THE FREE APP</a>
   						</div>
            </div>
          </div>
 			</div>
 		</div>
      </MuiThemeProvider>
    );
  }
}
