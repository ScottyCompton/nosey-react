import React from 'react';
import { connect } from 'react-redux';

import { clearSearch, doNavSearch } from '../../actions/SearchActions';
import { List, ListItem } from 'material-ui/List';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; //React Transitions API
import Search from 'material-ui/svg-icons/action/search';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';

import '../../../less/components/Header/search.less'; //Header styles

//connect to the store only for the things we care about
@connect((store) => {
  return {
    actors: store.Search.suggester.actors,
    directors: store.Search.suggester.directors,
    titles: store.Search.suggester.titles,
    error: store.Search.suggester.error,
    token: store.AccessToken.token
  };
})

export default class SearchBarSuggester extends React.Component {
  constructor() {
    super();
    this.state = {
      expand: false, //to show/hide the input field
      hasResults: "hide", //to show/hide the results dropdown list
      searchVal: "" //search query
    }
  }

  //toggles the input field when we click on the search icon
  toggleSearchBar() {
    const expand = (this.state.expand === false) ? true : false;
    this.setState({
      expand: expand
    })
  }

  //If we have at least 2 letters in the search bar, we can perform a search
  //if we don't then hide the results list altogether
  doSearch(e) {
    this.setState({
      searchVal: e.target.value
    });
    if (e.target.value.length < 2) {
      this.props.dispatch(clearSearch);
      this.setState({
        hasResults: "hide"
      })
    } else {
      this.props.dispatch(doNavSearch(e.target.value, this.props.token));
      this.setState({
        hasResults: "hasResults"
      })
    }
  }

  //Helper function for mapping Elastic search results to a list with a header
  mapSearchResults(searchResults, subheader) {
    if (searchResults && searchResults.length && searchResults.length > 0) {
      let mappedItems = [];
      mappedItems.push(<Subheader key={0}>{subheader}</Subheader>);
      searchResults.map((result, index) => {
        mappedItems.push(<ListItem key={index + 1}>{result.name}</ListItem>)
      });
      return mappedItems;
    } else {
      return [];
    }
  }

  render() {
    const { actors, directors, titles } = this.props;

    let Input = [], Actors = [], Directors = [], Titles = [];
    if (this.state.expand) {
      Input.push(<TextField key="0" hintText="Search" hintStyle={styles.hint} onChange={this.doSearch.bind(this)}/>)
    }

    //iterate over suggester resuls making a list item out of each one
    if (actors && actors.length) {
      Actors = this.mapSearchResults(actors, "Actors:");
    }
    if (directors && directors.length) {
      Directors = this.mapSearchResults(directors, "Directors:");
    }
    if (titles && titles.length) {
      Titles = this.mapSearchResults(titles, "Titles:");
    }

    const styles = require('./search.less');

    return (
      <div className={styles.searchBar}>
        <Search
          style={styles.searchIcon}
          onTouchTap={this.toggleSearchBar.bind(this)}
        />
        <ReactCSSTransitionGroup transitionName="showSearch" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
          {Input}
        </ReactCSSTransitionGroup>

        <div className={this.state.hasResults}>
          <List className={styles.searchResults}>
            { Titles }
            { Actors }
            { Directors }
          </List>
        </div>
      </div>
    )
  }
}
