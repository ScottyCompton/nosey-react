import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import SearchGrid from '../../components/SearchGrid/SearchGrid';

import { resetSearchGrid, searchChannels, searchVideos } from 'redux/modules/search';

@connect(state => ({
  channels: state.search.grid.channels,
  channels_error: state.search.grid.channelsError,
  videos: state.search.grid.videos,
  videos_error: state.search.grid.videosError,
  token: state.apiAccess.token
}), { searchChannels, searchVideos, resetSearchGrid })

export default class Search extends Component {
  static propTypes = {
    token: PropTypes.string.isRequired,
    searchChannels: PropTypes.func.isRequired,
    searchVideos: PropTypes.func.isRequired,
    resetSearchGrid: PropTypes.func.isRequired,
    channels: PropTypes.array,
    videos: PropTypes.array,
    loaded: PropTypes.bool,
    error: PropTypes.object,
    params: PropTypes.object,
    history: PropTypes.object
  };

  // min 2 characters required for us to fire off AJAX
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.params.query !== this.props.params.query && this.props.params.query.length >= 2) {
      this.props.searchChannels(this.props.token, this.props.params.query);
      this.props.searchVideos(this.props.token, this.props.params.query);
    }
  }

  componentWillUnmount() {
    this.props.resetSearchGrid();
  }

  render() {
    const styles = require("../../components/SearchGrid/style.less");
    const railItemPlaceholder = require('../../components/Rails/RailSlidePlaceholder.less');

    const { channels, videos } = this.props;
    let result = null;

    if (channels.length > 0 || videos.length > 0) {
      result = (
        <div>
          <Helmet title="Search"/>
          <SearchGrid gridTitle={"Matching Results for Series"} searchResults={channels}/>
          <SearchGrid gridTitle={"Matching Results for Episodes"} searchResults={videos}/>
        </div>
      );
    } else {
      result = (
        <div className="searchNotify">
          <h1>Sorry, didn't find anything matching your search.</h1>
          <h1>Please note there is a 2 character minimum for search functionality.</h1>
        </div>
      );
    }
    return result;
  }


}
