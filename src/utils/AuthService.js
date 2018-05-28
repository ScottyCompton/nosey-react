import { browserHistory } from 'react-router';
import config from '../config';

const isClient = () => {
  return typeof window !== 'undefined';
};

export default class AuthService {
  constructor() {
    const clientId = config.auth0.clientId;
    const domain = config.auth0.domain;
    const siteDomain = (process.env.NODE_ENV !== 'production') ? "http://www.noseyshows.com" : "https://www.nosey.com";

    // We need to get the path the person is currently on,
    // while making sure we don't accidentally replace it with /login
    // const path = browserHistory.getCurrentLocation().pathname;
    // if (path !== "/login") {
    //   localStorage.setItem('last_known_path', path);
    // }

    let initialScreen = 'login';
    if (location.pathname === '/signup' || location.pathname === '/welcome') {
      initialScreen = 'signUp';
    }

    // Configure Auth0
    const Auth0Lock = require('auth0-lock').default;
    this.lock = new Auth0Lock(clientId, domain, {
      theme: {
        logo: config.app.logo,
        primaryColor: '#53667B',
        labeledSubmitButton: false
      },
      languageDictionary: {
        title: ''
      },
      auth: {
        redirectUrl: siteDomain + '/login',
        responseType: 'token',
        params: { // Nosey's company ID is necessary to be passed to the "Sign In" rule on Auth0
          state: config.api.company_id // refer to rule "Check for existing customer in our collection" in Auth0
        }

      },
      initialScreen: initialScreen
    });
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this));
    // binds login functions to keep this context
    this.login = this.login.bind(this);
  }

  login() {
    if (isClient()) {
      // Call the show method to display the widget.
      this.lock.show();
    }
  }

  signUp() {
    if (isClient()) {
      if (localStorage.getItem(config.app.lockScreenShown) === 'true') {
        this.lock.show();
      }
    }
  }

  loggedIn() {
    if (isClient()) {
      // Checks if there is a saved token and it's still valid
      return !!this.getToken();
    }
    return false;
  }

  _doAuthentication(authResult) {
    if (isClient()) {
      // Saves the user token
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 14); // 2 weeks
      this.setToken(authResult.idToken, expiryDate.valueOf());
      // navigate to the last known route
      const lkp = localStorage.getItem('last_known_path');
      browserHistory.replace((lkp ? lkp : '/'));
    }
  }

  setToken(idToken, exp) {
    if (isClient()) {
      try {
        // Saves user token to local storage
        localStorage.setItem('id_token', idToken);
        localStorage.setItem('id_token_exp', exp);
        localStorage.setItem(config.app.lockScreenShown, 'true');
      } catch (err) {
        // Privacy mode does not allow this
      }
    }
  }

  getToken() {
    if (isClient()) {
      let tokenExp = localStorage.getItem('id_token_exp');
      if (!tokenExp) {
        return false;
      }

      const clientToken = localStorage.getItem('id_token');
      if (!clientToken) {
        return false;
      }

      tokenExp = Number(tokenExp);

      // If we have a token expiration and it's passed, we don't return the token
      const now = Math.floor(Date.now() / 1000);
      if (now > tokenExp) {
        return false;
      }
      // Retrieves the user token from local storage
      return clientToken;
    }
  }

  getSpotlightToken() {
    if (isClient()) {
      // console.log("getSpotlightToken() called in AuthService.js", localStorage.getItem('x_client_token'));
      // Retrieves the user spotlight token from local storage
      if (this.loggedIn()) {
        return localStorage.getItem('x_client_token');
      }

      return '';
    }
  }

  logout() {
    if (isClient()) {
      // Clear user token and profile data from local storage
      localStorage.removeItem('id_token');
      localStorage.removeItem('x_client_token');
      // navigate to the home route
      browserHistory.replace('/');
    }
  }

  getProfile(callback) {
    if (isClient()) {
      this.lock.getProfile(this.getToken(), (err, profile) => {
        if (profile && profile.spotlight) {
          try {
            localStorage.setItem('x_client_token', profile.spotlight);
          } catch (error) {
            // Privacy mode does not allow this
          }
        } else {
          callback("Error: no client token was returned from Auth0", null);
        }
        callback(err, profile);
      });
    }
  }
}
