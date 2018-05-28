import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import Helmet from 'react-helmet';
import { isLoaded as isApiAccessLoaded, load as loadApiAccess } from 'redux/modules/apiAccess';
import RaisedButton from 'material-ui/RaisedButton';
import ActionPlay from 'material-ui/svg-icons/av/play-circle-outline';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import theme from 'theme/theme';

import config from '../../config';
import AuthService from '../../utils/AuthService';

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
  countryCode: state.apiAccess.countryCode
}), {})
export default class Welcome extends Component {
  static propTypes = {
    countryCode: PropTypes.string
  };

  constructor() {
    super();

    this.state = {
      showSignUp: false,
      countryNotSupported: false
    };

    this.auth = new AuthService();
    this.signUpShown = false;
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  componentWillMount() {
    const { countryCode } = this.props;
    this.setState({
      countryNotSupported: (countryCode !== 'US')
    });
  }

  handleSignUp(e) {
    e.preventDefault();

    try {
      localStorage.setItem(config.app.lockScreenShown, 'true');
    } catch (err) {
      // Privacy mode does not allow this
    }

    // viewContent pixel event
    if (fbq && navigator) {
      // send custom Facebook pixel event
      fbq('track', 'ViewContent', {
        userAgent: navigator.userAgent,
        language: navigator.language
      });
    }

    if (!this.auth.loggedIn()) {
      this.auth.signUp();
    }
  }

  handleSkip(e) {
    e.preventDefault();
    try {
      localStorage.setItem(config.app.lockScreenShown, 'true');
    } catch (err) {
      // Privacy mode does not allow this
    }
    browserHistory.push('/');
  }

  render() {
    const welcomeStyles = require('./Welcome.less');

    const { countryNotSupported } = this.state;

    if (typeof window !== 'undefined') {
      const lockScreenShown = localStorage.getItem(config.app.lockScreenShown);
      if (!countryNotSupported && (this.auth.loggedIn() || lockScreenShown === 'true')) {
        if (lockScreenShown !== 'true') {
          try {
            localStorage.setItem(config.app.lockScreenShown, 'true');
          } catch (err) {
            // Privacy mode does not allow this
          }
        }
        browserHistory.push('/');
      }
    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
        <div className="welcome-content">
          <Helmet title="Welcome"/>
          <div className="welcome-container">
            <div className="welcome-logo"><img src="//s3.amazonaws.com/nosey-website/nosey-logo-lg.png"
                                               className="img-responsive"/></div>
            <div className="reg-welcome-content">
              {countryNotSupported && (
                <div className="reg-content">
                  <h1>Sorry, Nosey is not supported in your country.</h1>
                </div>
              )}
              {!countryNotSupported && (
                <div className="reg-content">
                  <h1>Watch full episodes of Maury Povich, Jerry Springer, Steve Wilkos, Paternity Court,
                    Cheaters,
                    Match Game, Family Feud and more for <strong>FREE</strong>.</h1>
                  <div className="btn-block text-center">
                    <RaisedButton
                      href="#register"
                      label="Register"
                      labelColor="#61F061"
                      labelStyle={{ 'font-size': '36px' }}
                      backgroundColor="#212432"
                      className="register-now-button"
                      onClick={this.handleSignUp}
                      buttonStyle={{ 'height': '60px', 'padding-top': '10px' }}
                      icon={<ActionPlay />}
                    />
                    <br /><br />
                    <Link to="#skip" onClick={this.handleSkip} className="reg-skip">Skip for now...</Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
