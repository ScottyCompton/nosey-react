import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

@connect(state => ({ time: Date.now() }))
export default class MiniInfoBar extends Component {
  static propTypes = {
    time: PropTypes.number
  };

  render() {
    const { time } = this.props;
    return (
      <div className="mini-info-bar">
        The info bar was last loaded at
        {' '}
        <span>{time && new Date(time).toString()}</span>
      </div>
    );
  }
}
