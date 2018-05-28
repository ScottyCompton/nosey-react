import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Hero from 'components/Hero/Hero';
import Rail from 'components/Rails/Rail';
import Helmet from 'react-helmet';
import { load as loadHomeChannels } from 'redux/modules/home';
import { updateProgressBar } from 'redux/modules/progress';
import Util from '../../helpers/Util';
import AuthService from '../../utils/AuthService';

import config from '../../config';

@connect(state => ({
  railContent: state.home.results,
  token: state.apiAccess.token,
  progress: state.progress,
  countryCode: state.apiAccess.countryCode,
  started: state.points.started,
  complete: state.points.complete,
  pointsLoaded: state.points.loaded
}), { loadHomeChannels, updateProgressBar })
export default class Home extends Component {
  static propTypes = {
    loadHomeChannels: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    countryCode: PropTypes.string.isRequired,
    railContent: PropTypes.array,
    updateProgressBar: PropTypes.func.isRequired,
    progress: PropTypes.object,
    loaded: PropTypes.bool,
    started: PropTypes.array,
    complete: PropTypes.array,
    pointsLoaded: PropTypes.bool,
    error: PropTypes.object
  };

  componentWillMount() {
    const { railContent, token, countryCode } = this.props;
    this.props.loadHomeChannels(token, countryCode);
    if (typeof dotstudiozPlayer !== 'undefined' && typeof dotstudiozPlayer.player !== 'undefined') {
      dotstudiozPlayer.player.dispose(); // In case somebody goes home before the player can instantiate
    }
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.removeItem('returnFromSearch');
    }
  }

  render() {
    const homeStyles = require('./Home.less');
    const railStyles = require('../../components/Rails/style.less');
    const slickStyles = require('../../components/Rails/slick.less');
    const slickTheme = require('../../components/Rails/slick.theme.less');
    const railItemPlaceholder = require('../../components/Rails/RailSlidePlaceholder.less');

    Util.redirectIfFirstTimeVisitor();

    if (typeof window === 'undefined') {
      return <div/>;
    }

    const { railContent, token, countryCode, pointsLoaded } = this.props;
    if (!this.auth) {
      this.auth = new AuthService();
    }

    const Rails = [];
    if (typeof railContent !== 'undefined' && railContent.length !== 0) {
      const percentageUnit = (90 / (railContent.length - 1));
      let percentage = 10 + Math.round(percentageUnit);
      railContent.map((val, i) => {
        if (val === null || !val.category || !val.category.slug) return;
        percentage += percentageUnit;
        if (i === railContent.length - 1) {
          percentage = 100;
        }
        if ((val && val.category && val.category.slug && val.category.slug === "featured") || (val && val.category && val.category.platforms.length && !val.category.platforms[0].website)) {
          return;
        }
        Rails.push(<Rail key={"homerail" + i} name={val.category.name} slug={val.category.slug} content={val}
                         token={token} progressPercentage={percentage}/>);
      });
    }

    // if we have points data for this user
    // need to construct rails out of it at the top of Home page
    if (pointsLoaded && this.auth.loggedIn()) {
      const { started, complete } = this.props;
      // unshift inserts something at the start of an array
      // so we want to make the continue watching rail first
      // then the rest of the rails, and then watch again
      if (started && started.length > 0) {
        Rails.unshift(<Rail key={"continueWatching"} name={"Continue Watching"} token={token} content={{}}
                            slug={"continue-watching"} pointData={started}/>);
      }
      if (complete && complete.length > 0) {
        Rails.push(<Rail key={"watchAgain"} name={"Watch Again"} token={token} content={{}} slug={"watch-again"}
                         pointData={complete}/>);
      }
    }

    return (
      <div>
        <Helmet title="Nosey - Watch Talk Shows, Reality TV, Game Shows & More!"/>
        {countryCode === 'US' && (
          <div>
            <div className="row">
              <div className="col-md-12">
                <Hero category="featured"/>
              </div>
            </div>
            <div className="rails-container row">
              <div className="col-md-12">
                {Rails}
                {/* <MoreLikeThis/> */}
              </div>
            </div>
          </div>)}
      </div>
    );
  }
}
