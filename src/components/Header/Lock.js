import React, { Component } from 'react';
import AuthService from '../../utils/AuthService';
import FlatButton from 'material-ui/FlatButton';
import 'babel-polyfill';
import { FormattedMessage } from 'react-intl';
import Profile from '../Profile/Profile';

export default class Lock extends Component {
  constructor() {
    super();

    this.signUpShown = false;
  }

  render() {
    const lockStyles = require('./lock.less');
    const headerStyles = require('./style.less');

    const isClient = typeof window !== 'undefined';
    if (isClient) {
      if (!this.auth) {
        this.auth = new AuthService();
      }

      if (this.auth.loggedIn()) {
        return (<Profile auth={this.auth}/>);
      }

      if (!this.signUpShown && (location.pathname === '/welcome' || location.pathname === '/signup')) {
        if (!this.auth.loggedIn()) {
          this.signUpShown = true;
          this.auth.signUp();
        }
      }

      return (<FlatButton label={<FormattedMessage id="lock.login"/>} className="hdr-btn" onClick={this.auth.login}/>);
    }

    return <div/>;
  }
}
