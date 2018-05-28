import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { List, ListItem } from 'material-ui/List';
import { load as loadCategories } from 'redux/modules/categories';

@connect(
  state => ({
    token: state.apiAccess.token,
    countryCode: state.apiAccess.countryCode,
    categories: state.categories.categories,
    loaded: state.categories.loaded
  }),
  { loadCategories }
)

export default class NavMenu extends Component {
  static propTypes = {
    loadCategories: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired,
    countryCode: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    loaded: PropTypes.bool,
    error: PropTypes.object,
    mouseOverHandler: PropTypes.func.isRequired,
    mouseOutHandler: PropTypes.func.isRequired
  };

  // Fired when component is about to re-/render in the virtual DOM
  componentWillMount() {
    const { token, countryCode } = this.props;
    this.props.loadCategories(token, countryCode);
  }

  // Fired when component is about to be removed from the virtual DOM
  componentWillUnmount() {
    //  this.props.dispatch(getCategories(this.props.countryCode, this.props.token));
  }

  handleMouseOver() {
    this.props.mouseOverHandler();
  }

  handleMouseOut() {
    this.props.mouseOutHandler();
  }

  render() {
    const { categories } = this.props;
    const styles = require('./navmenu.less');

    // Iterate over our categories, making each one a list item
    let Categories = [];
    if (categories && categories.length > 0) {
      categories.map((category, index) => {
        if (category.menu && category.platforms[0].website === "true") {
          const url = `/${category.slug}`;
          Categories.push(
            <div key={index + 1}>
              <Link to={url}><ListItem primaryText={category.name}/></Link>
            </div>
          );
        }
      });
    } else {
      Categories.push(<div key="0"/>);
    }

    return (
      <div className="dropdown"
           style={{ padding: '30px', 'top': '-30px', left: '-30px' }}
           onMouseEnter={this.handleMouseOver.bind(this)} onMouseLeave={this.handleMouseOut.bind(this)}>
        <List className="navMenu">
          {Categories}
        </List>
      </div>
    );
  }
}
