import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Rail from 'components/Rails/Rail';
import { load as loadMoreLikeThis } from 'redux/modules/morelikethis';
import { updateProgressBar } from 'redux/modules/progress';

@connect(state => ({
  railContent: state.morelikethis.results,
  token: state.apiAccess.token,
  progress: state.progress,
  countryCode: state.apiAccess.countryCode
}), { loadMoreLikeThis, updateProgressBar })

export default class MoreLikeThis extends Component {

  static propTypes = {
    loadMoreLikeThis: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    countryCode: PropTypes.string.isRequired,
    railContent: PropTypes.object,
    updateProgressBar: PropTypes.func.isRequired,
    progress: PropTypes.object,
    loaded: PropTypes.bool,
    error: PropTypes.object,
    videoId: PropTypes.string,
    location: PropTypes.object
  };

  componentDidMount() {
    const { railContent, token, countryCode } = this.props;
    this.props.loadMoreLikeThis(token, countryCode);
  }

  shufflePlaylist(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  render() {
    const { railContent, token, videoId, location } = this.props;
    let content = {};
    if (railContent && railContent.playlist) {
      content = railContent;
      let playlist = this.shufflePlaylist(railContent.playlist);
      let newPlaylist = [];
      for (let a = 0; a < 10; a++) {
        newPlaylist.push(playlist[a]);
      }
      content.playlist = newPlaylist;
    }
    return (
      <Rail key={"morelikethis"} name={"More Like This"} slug={"more-like-this"} channel_slug={"more-like-this"}
            content={content} token={token} progressPercentage={100} parentPath={"/more-like-this/more-like-this"} isParentChannel={false} current={videoId} videoId={videoId}/>
    );
  }
}

