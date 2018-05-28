import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { updateProgressBar } from 'redux/modules/progress';
import Util from '../../helpers/Util';

@connect(state => ({
  progress: state.progress
}), { updateProgressBar })
export default class About extends Component {
  static propTypes = {
    updateProgressBar: PropTypes.func.isRequired,
    progress: PropTypes.object
  };

  componentDidMount() {
    this.props.updateProgressBar(100);
  }

  render() {
    const aboutStyles = require('./About.less');

    // Util.redirectIfFirstTimeVisitor();

    return (
      <div className="container about-us">
        <Helmet
          title="About Us"
          meta={[
            { name: 'title', content: 'About Us | Nosey - TV Shows Online' },
            { property: 'og:title', content: 'About Us | Nosey - TV Shows Online' },
          ]}
          link={[{rel: 'canonical', content: 'https://www.nosey.com/about'}]}
        />
        <div className="row">
          <div className="col-xs-12 basic-text nopad">
            <div className="row nopad">
              <div className="col-xs-12 nopad">
                <div className="nosey-topshelf"><img src="http://dke5fmveuky7d.cloudfront.net/img/nosey-topshelf-1.jpg" className="img-responsive" /></div>
                <div  className="nosey-topshelf-text"><h1><span className="nosey">Nosey</span> is the FREE TV video app with full episodes of the best of Maury Povich,
                Jerry Springer, Steve Wilkos, Paternity Court, Cheaters, Match Game, Family Feud and much, much more!
              </h1></div>
              </div>
            </div>
            <div className="row nopad">
              <div className="col-xs-12 nopad">
                <div className="nosey-devices">
                <h1>Reality, Court and Talk TV shows have never been easier to watch online.</h1>
                <img src="//s3.amazonaws.com/nosey-website/nosey-devices.png" className="img-responsive" />
                <h1><span className="nosey">Nosey</span> lets you watch wherever, whenever and for as long as you want.</h1>
                </div>
              </div>
            </div>
            <div className="row nopad">
              <div className="col-xs-12 nopad">
                <div className="nosey-more-about">
                  <img src="//s3.amazonaws.com/nosey-website/montage-dark.jpg" className="img-responsive" />
                  <img src="//s3.amazonaws.com/nosey-website/montage-dark.jpg" className="img-responsive xs-visible" />
                <div className="nosey-about-text"><h2>Who cheated? Who’s the father? Who’s to blame? Who’s better off single? Who’ll win big!? Whether you’ve been watching for decades and wished you could see your favorite episodes again, whether you fell in love with these great shows while staying home sick or staying up late, you can finally watch these tv shows for free online with your phone or tablet! Wondering “who’s the father”? Maury Povich will answer that question all day long on   Nosey. Relationship Problems? Watch Blind Date and Cheaters anytime you want on Nosey. Remember Sally Jesse Raphael? Richard Dawson on Family Feud? They’re back…on Nosey.</h2>
                <h1>Best of all, Nosey is absolutely <span className="nosey">FREE!</span></h1>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
