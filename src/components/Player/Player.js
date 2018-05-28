import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { browserHistory, connect } from 'react-redux';
import Helmet from 'react-helmet';
import Script from 'react-load-script';
import { cleanIVPVideo, loadIVPVideo } from 'redux/modules/player';
import { updateProgressBar } from 'redux/modules/progress';
import { sendResumptions } from 'redux/modules/resumptionsend';
import PlayerControlBar from './PlayerControlBar';
import ReactGA from 'react-ga';
import config from '../../config';

// connect to the store so we can get/retrieve token
@connect(state => ({
    videoObj: state.player.video,
    loading: state.player.loading,
    loaded: state.player.loaded,
    token: state.apiAccess.token,
    progress: state.progress,
    error: state.player.error,
    countryCode: state.apiAccess.countryCode
  }), { loadIVPVideo, cleanIVPVideo, updateProgressBar, sendResumptions }
)

export default class PlayerDisplay extends Component {
  static propTypes = {
    loadIVPVideo: PropTypes.func.isRequired,
    cleanIVPVideo: PropTypes.func,
    token: PropTypes.string.isRequired,
    client_token: PropTypes.string,
    countryCode: PropTypes.string.isRequired,
    channels: PropTypes.array,
    loaded: PropTypes.bool,
    loading: PropTypes.bool,
    error: PropTypes.object,
    videoObj: PropTypes.object,
    previousVideo: PropTypes.string,
    nextVideo: PropTypes.string,
    userId: PropTypes.string,
    video_id: PropTypes.string.isRequired,
    historyObj: PropTypes.object,
    updateProgressBar: PropTypes.func.isRequired,
    sendResumptions: PropTypes.func,
    progress: PropTypes.object,
    continueFrom: PropTypes.number,
    locationObj: PropTypes.object
  };

  componentWillMount() {
    const { token, video_id, loading, historyObj } = this.props;
    this.props.loadIVPVideo(token, video_id);

    // If the player object already exists, we've loaded it before, so we just instantiate a new player
    if (typeof dotstudiozPlayer !== 'undefined') {
      if (typeof dotstudiozPlayer.player !== 'undefined' && dotstudiozPlayer.player.el_ !== null) {
        dotstudiozPlayer.player.dispose();
      }
      dotstudiozPlayer.requireConfig();
      dotstudiozPlayer.startRender({ 'video_id': this.props.video_id, 'start_offset': this.props.continueFrom });
      this.playerReady(dotstudiozPlayer);
    }
    this.forceUpdate();
  }

  componentWillReceiveProps(nextProps) {
    // console.log("Received props", nextProps);
    const { token, loading, historyObj } = this.props;
    const goToNextVideo = this.goToNextVideo;
    if (nextProps.video_id !== this.props.video_id) {
      // console.log("Video is different");
      if (typeof dotstudiozPlayer !== 'undefined') {
        // console.log("Player class object is defined");
        if (typeof dotstudiozPlayer.player !== 'undefined' && typeof dotstudiozPlayer.player.source_switch !== 'undefined') {
          // console.log("player and source switch are not undefined");
          if (typeof dotstudiozPlayer.player !== 'undefined' && dotstudiozPlayer.player.el_ !== null) {
            // Switch the source instead of recreating the player, since we aren't unmounting
            // console.log("Should switch source");
            dotstudiozPlayer.player.source_switch(nextProps.video_id);
            const clientToken = localStorage.getItem('x_client_token') || "";
            // If we have a user, then we send it to the analytics obj
            if (this.props.userId.length > 0) {
              const analyticsReady = setInterval(() => {
                if (dotstudiozPlayer.player.analytics_loaded) {
                  clearInterval(analyticsReady);
                  // console.log("Sending customer_aquired");
                  dotstudiozPlayer.player.trigger('customer_aquired', { customer: this.props.userId });
                }
              });
            }
            this.playerReady(dotstudiozPlayer, nextProps.nextVideo);
          } else {
          if (dotstudiozPlayer.player && dotstudiozPlayer.player.el_ !== null) { dotstudiozPlayer.player.dispose(); delete dotstudiozPlayer.player; }
            dotstudiozPlayer.requireConfig();
            dotstudiozPlayer.startRender({ 'video_id': nextProps.video_id });
            this.playerReady(dotstudiozPlayer, nextProps.nextVideo);
          }
        } else {
          if (dotstudiozPlayer.player && dotstudiozPlayer.player.el_ !== null) { dotstudiozPlayer.player.dispose(); delete dotstudiozPlayer.player; }
          dotstudiozPlayer.requireConfig();
          dotstudiozPlayer.startRender({ 'video_id': nextProps.video_id });
          this.playerReady(dotstudiozPlayer, nextProps.nextVideo);
        }
        if (!loading) {
          this.props.loadIVPVideo(token, nextProps.video_id);
        }
      }
    } else {
      // if (typeof dotstudiozPlayer === 'undefined') {
      //   const playerReady = setInterval(() => {
      //     if (typeof dotstudiozPlayer === 'undefined') return;
      //     clearInterval(playerReady);
      //       console.log("Running here 4");
      //     this.playerReady(dotstudiozPlayer, nextProps.nextVideo);
      //   }, 500);
      // }
    }
    console.log("Should force update");

    this.forceUpdate();
  }

  componentWillUnmount() {
    if (typeof dotstudiozPlayer !== 'undefined' && typeof dotstudiozPlayer.player !== 'undefined') {
      dotstudiozPlayer.player.trigger('sendbeforeunload');
      const time = dotstudiozPlayer.player.currentTime();
      const duration = dotstudiozPlayer.player.duration();
      if (time/duration > 0.02) {
        const { token, video_id } = this.props;
        const clientToken = localStorage.getItem('x_client_token') || "";
        // If we have a client token, then we can send the resumption, since we have a user to attach it to.
        if (clientToken.length > 0 && this.props.userId.length > 0) this.props.sendResumptions(token, clientToken, video_id, time);

        // for the "return from search" feature
        if (this.props.locationObj) {
          const { videoObj } = this.props;
          let videoPath = this.props.locationObj.pathname;
          if (videoPath.includes('/video/')) {
            videoPath = videoPath + "?t=" + Math.round(time);
          } else {
            videoPath = videoPath + '/video/' + videoObj._id + "?t=" + Math.round(time);
          }
          try {
            localStorage.setItem("returnFromSearch", videoPath);
          } catch (err) {
            // Privacy mode does not allow this
          }
        }
      }
      if (dotstudiozPlayer.player.el_ !== null) {
        dotstudiozPlayer.player.off('endedReactPlayer');
        dotstudiozPlayer.player.pause();
        if (dotstudiozPlayer.player && dotstudiozPlayer.player.el_ !== null) { dotstudiozPlayer.player.dispose(); delete dotstudiozPlayer.player; }
      }
    }
    this.props.cleanIVPVideo();
    this.forceUpdate();
  }

  playerReady(dotstudiozPlayer, nextVideo) {
    const playerReady = setInterval(() => {
      if (dotstudiozPlayer && dotstudiozPlayer.player) {
        clearInterval(playerReady);
        const clientToken = localStorage.getItem('x_client_token') || "";
        // If we have a user, then we send it to the analytics obj
        if (this.props.userId.length > 0) {
          // console.log("We have a user ID");
          const analyticsReady = setInterval(() => {
            if (dotstudiozPlayer.player.analytics_loaded) {
              // console.log("analytics_loaded :)");
              clearInterval(analyticsReady);
              // console.log("Sending customer_aquired");
              dotstudiozPlayer.player.trigger('customer_aquired', { customer: this.props.userId });
            }
          });
        }

        if (nextVideo) {
          const setNext = () => {
            this.goToNextVideo(nextVideo, this.props.historyObj);
          };
          dotstudiozPlayer.player.off("ended", setNext);
          dotstudiozPlayer.player.one("ended", setNext);
        }
        console.log("SETTING GA STUFF");
        // GOOGLE ANALYTICS
        dotstudiozPlayer.player.on('play', ()=>{
          ReactGA.event({
            category: 'Play',
            action: 'PlayEvent',
            label: this.props.video_id,
            nonInteraction: true
          });
        }).one('first_frame', ()=>{
          console.log("First frame fired!!!");
          ReactGA.event({
            category: 'Play',
            action: 'FirstFrame',
            label: this.props.video_id,
            nonInteraction: true
          });

          if (fbq) {
            // send custom Facebook pixel event
            fbq('trackCustom', 'videoView', {
              id: this.props.video_id
            });
          }
        });
      }
    }, 500);
  }

  goToNextVideo(url, history) {
    history.push(url);
  }

  isBrowser() {
    return !(typeof document === "undefined" || typeof window === "undefined");
  }

  handleScriptError() {
    // // console.log("Player Script could not load error");
  }

  handleScriptLoad() {
    const goToNextVideo = this.goToNextVideo;
    const { nextVideo, historyObj } = this.props;
    let ready = false;
    console.log("HANDLE SCRIPT LOAD");
    const playerReady = setInterval(() => {
      if (typeof dotstudiozPlayer === 'undefined' || ready) return;
        clearInterval(playerReady);
        ready = true;
        dotstudiozPlayer.requireConfig();
        dotstudiozPlayer.startRender({ 'video_id': this.props.video_id, 'start_offset': this.props.continueFrom });
          // console.log("Player is ready after initial script load");
          this.playerReady(dotstudiozPlayer);
          setTimeout(() => {
            this.props.updateProgressBar(100);
          }, 1000);
    }, 500);
  }


  render() {
    const styles = require('./style.less');

    const { videoObj, previousVideo, nextVideo } = this.props;

    const url = `${config.playerHost}/player/${this.props.video_id}?targetelm=.player&companykey=57fe8fe399f815e309dbc2f4&autostart=true&enablesharing=false&skin=61F061&pagetype=site&render=false`;
    const currentUrl = this.isBrowser() ? window.location.href : '';
    const script = (<Script
      url={url}
      onError={this.handleScriptError.bind(this)}
      onLoad={this.handleScriptLoad.bind(this)}
    />);

    return (
      <div key="dspPlayerComponent" className="player-area">
        {this.props.loaded && <Helmet description={videoObj.description} meta={[{ name: 'description', content: videoObj.description }, { property: 'og:description', content: videoObj.description }]} /> }
        {script}
        <div className="player-container">
          <div>
            <div className="intrinsic-container intrinsic-container-16x9">
              <div id="player" className="player"/>
            </div>

          </div>
        </div>
        <PlayerControlBar previousVideo={previousVideo} nextVideo={nextVideo} videoObj={videoObj}
                          currentUrl={currentUrl}/>
      </div>
    );
  }
}
