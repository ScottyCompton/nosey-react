/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import io from 'socket.io-client';
import { Provider } from 'react-intl-redux';
import { browserHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-connect';
import useScroll from 'scroll-behavior/lib/useStandardScroll';
import getRoutes from './routes';
import ReactGA from 'react-ga';
import config from './config';

// React-ga plugin init
ReactGA.initialize(config.googleAnalytics, {
  debug: false
});

function logPageView() {
  // console.log("GA logPageView(): " + window.location.pathname);
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}


// import injectTapEventPlugin from 'react-tap-event-plugin';
// injectTapEventPlugin(); //https://github.com/callemall/material-ui#react-tap-event-plugin

const client = new ApiClient();
const _browserHistory = useScroll(() => browserHistory)();
const dest = document.getElementById('content');

import englishLocaleData from './i18n/en';
const initialState = window.__data || {};
initialState.intl = {
  locale: 'en',
  messages: englishLocaleData.messages
};
const store = createStore(_browserHistory, client, initialState);
const history = syncHistoryWithStore(_browserHistory, store);

function initSocket() {
  const socket = io('', { path: '/ws' });
  socket.on('news', () => {
    socket.emit('my other event', { my: 'data from client' });
  });
  socket.on('msg', (data) => {
    console.log(data);
  });

  return socket;
}

global.socket = initSocket();

const component = (
  <Router render={(props) =>
    <ReduxAsyncConnect {...props} helpers={{ client }} filter={item => !item.deferred}/>
  } history={history} onUpdate={logPageView}>
    {getRoutes(store)}
  </Router>
);

ReactDOM.render(
  <Provider store={store} key="provider">
    <div>
      {component}
    </div>
  </Provider>,
  dest
);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}

if (__DEVTOOLS__ && !window.devToolsExtension) {
  const DevTools = require('./containers/DevTools/DevTools');
  ReactDOM.render(
    <Provider store={store} key="provider">
      <div>
        {component}
        <DevTools />
      </div>
    </Provider>,
    dest
  );
}
