import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

export default class HeroSlidePlaceholder extends Component {
  static propTypes = {
    preloadText: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = { width: '0', height: '0' };
    // this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    // console.log(this.props.preloadText);
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  updateWindowDimensions() {
    const w = (window.innerWidth / 2) - 46;
    const h = w * 0.563;
    this.setState({ width: w, height: h });
  }

  render() {
    return (
      <div className="hero-timeline-wrapper">
        <div className="hero-timeline-item" style={{ width: this.state.width, height: this.state.height }}>
          <div className="hero-animated-background"></div>
        </div>
      </div>
    );
  }
}
