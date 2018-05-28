import React from 'react';
import { PropTypes } from 'prop-types';
import GridItem from '../SearchGrid/SearchGridItem';
const styles = require('./style.less');


export default class SearchGrid extends React.Component {
  static propTypes = {
    gridTitle: PropTypes.string.isRequired,
    category: PropTypes.string,
    searchResults: PropTypes.array,
    loaded: PropTypes.bool,
    error: PropTypes.object
  };

  render() {
    const searchResults = this.props.searchResults;
    const gridTitle = this.props.gridTitle;
    let result = null;
    let SearchGridItems = [];

    if (searchResults && searchResults.length > 0) {
      searchResults.map((item, index) => {
        SearchGridItems.push(
          <GridItem key={index + 1} {...item} itemType="searchResult"/>
        );
      });
    }

    if (searchResults.length > 0) {
      result = (
        <div className="searchGridWrapper">
          <h1 className="searchCategory" key="0">{gridTitle}</h1>
          <div className="searchContainer">
            {SearchGridItems}
          </div>
        </div>
      );
    } else {
      result = (
        <span></span>
      );
    }
    return result;
  }
}
