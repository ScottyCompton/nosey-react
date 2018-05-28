import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { resetSearchGrid, searchChannels, searchNav, searchVideos } from 'redux/modules/search';
import Clear from 'material-ui/svg-icons/content/clear';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // React Transitions API
import Search from 'material-ui/svg-icons/action/search';
import TextField from 'material-ui/TextField';

@connect(
  state => ({
    token: state.apiAccess.token,
    countryCode: state.apiAccess.countryCode,
    actors: state.search.actors,
    directors: state.search.directors,
    titles: state.search.titles,
    channels: state.search.channels,
    videos: state.search.videos,
    reset: state.search.reset
  }),
  { searchNav, searchChannels, searchVideos, resetSearchGrid }
)

export default class SearchBar extends Component {
  static propTypes = {
    searchNav: PropTypes.func.isRequired,
    searchChannels: PropTypes.func.isRequired,
    searchVideos: PropTypes.func.isRequired,
    resetSearchGrid: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    countryCode: PropTypes.string.isRequired,
    location: PropTypes.object,
    reset: PropTypes.bool,
    actors: PropTypes.array,
    directors: PropTypes.array,
    titles: PropTypes.array,
    channels: PropTypes.array,
    videos: PropTypes.array,
    loaded: PropTypes.bool,
    error: PropTypes.object
  };

  constructor() {
    super();

    this.state = {
      expand: false, // To show/hide the input field
      searchVal: '', // Search query
      showClear: false
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.reset) {
      this.clearSearchBarOnly();
    }
  }

  // Toggles the input field when we click on the search icon
  toggleSearchBar() {
    this.setState({
      expand: !this.state.expand
    });

    if (typeof window !== 'undefined') {
      // If we have chosen to hide the input field and there's no input, go back to home
      if (!this.state.expand && this.state.searchVal === 0) {
        browserHistory.push('/');
      }
    }
  }

  // If we have at least 2 letters in the search bar, we can perform a search
  doSearch(event) {
    this.setState({
      searchVal: event.target.value
    });

    if (event.target.value.length > 0) {
      this.setState({
        showClear: true
      });
      if (typeof window !== 'undefined') {
        browserHistory.push('/search/' + event.target.value);
      }
    } else {
      this.setState({
        showClear: false,
        expand: true
      });

      this.props.resetSearchGrid();
      if (typeof window !== 'undefined') {
        browserHistory.push('/');
      }
    }
  }

  // Pressing the X does a full reset of the search bar, results, and locattion
  clearSearchResults() {
    this.setState({
      expand: false,
      searchVal: '',
      showClear: false
    });

    // if we came from an IVP we want to go back to it after clearing search results
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const previousIVP = localStorage.getItem('returnFromSearch');
      if (previousIVP) {
        localStorage.removeItem('returnFromSearch');
        browserHistory.push(previousIVP);
      } else {
        // otherwise go to home
        browserHistory.push('/');
      }
    }
  }

  clearSearchBarOnly() {
    this.setState({
      expand: false,
      searchVal: '',
      showClear: false
    });
  }

  render() {
    const styles = {
      searchIcon: {
        transform: 'translateY(10px)',
        marginRight: '10px'
      },
      clearIcon: {
        transform: 'translateY(10px)',
        position: 'absolute',
        right: '-5px'
      },
      underlineStyle: {
        borderColor: 'white'
      }
    };

    const searchStyles = require('./search.less');

    let textField = null;
    if (this.state.expand) {
      textField =
        <TextField hintText="Search" underlineFocusStyle={styles.underlineStyle} onChange={this.doSearch.bind(this)}/>;
    }

    let clearElem = null;
    if (this.state.showClear) {
      clearElem = <Clear style={styles.clearIcon} onClick={this.clearSearchResults.bind(this)}/>;
    }

    return (
      <div className="searchBar">
        <Search className="search-button" style={styles.searchIcon} onClick={this.toggleSearchBar.bind(this)}/>

        <ReactCSSTransitionGroup transitionName="showSearch" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
          {textField}
        </ReactCSSTransitionGroup>

        <ReactCSSTransitionGroup transitionName="clearSearchBtn" transitionEnterTimeout={500}
                                 transitionLeaveTimeout={500}>
          {clearElem}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
