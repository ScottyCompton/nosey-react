import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

export default class RailSlide extends Component {
  static propTypes = {
    preloader: PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="timeline-wrapper">
        <div className="timeline-item">
          <div className="animated-background">
            <div className="background-masker header-top"></div>
            <div className="background-masker header-left"></div>
            <div className="background-masker header-right"></div>
            <div className="background-masker header-bottom"></div>
            <div className="background-masker subheader-left"></div>
            <div className="background-masker subheader-right"></div>
            <div className="background-masker subheader-bottom"></div>
            <div className="background-masker content-top"></div>
            <div className="background-masker content-first-end"></div>
            <div className="background-masker content-second-line"></div>
            <div className="background-masker content-second-end"></div>
            <div className="background-masker content-third-line"></div>
            <div className="background-masker content-third-end"></div>
          </div>
        </div>
      </div>
    );
  }

}