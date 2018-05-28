import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Footer from '../../components/Footer/Footer';
import Helmet from 'react-helmet';
import Header from '../../components/Header/Header';
import ProgressBar from 'react-progress-bar-plus';
import { updateProgressBar } from 'redux/modules/progress';
import { isLoaded as isApiAccessLoaded, load as loadApiAccess } from 'redux/modules/apiAccess';
import { push } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-connect';

import theme from 'theme/theme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];

    if (!isApiAccessLoaded(getState())) {
      promises.push(dispatch(loadApiAccess()));
    }

    return Promise.all(promises);
  }
}])

@connect(
  state => ({
    progress: state.progress
  }),
  { updateProgressBar, pushState: push })

export default class App extends Component {
  static propTypes = {
    updateProgressBar: PropTypes.func.isRequired,
    children: PropTypes.object.isRequired,
    progress: PropTypes.object,
    pushState: PropTypes.func.isRequired,
    navigator: PropTypes.object
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentDidMount() {
  }

  render() {
    const styles = require('./App.less');

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
        <div className="app">
          <Helmet {...config.app.head} />

          <Header/>

          <ProgressBar spinner={Boolean(false)} percent={this.props.progress.percentage}
                       autoIncrement={this.props.progress.percentage === 0 ? Boolean(true) : Boolean(false)}
                       intervalTime={30} onTop={Boolean(false)}/>
          <div className="big-ol-container">
            {this.props.children}
          </div>

          <Footer/>

          <div id="fb-root"></div>
        </div>
      </MuiThemeProvider>
    );
  }
}
