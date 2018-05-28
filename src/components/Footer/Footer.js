import React from 'react';
import { IndexLink, Link } from 'react-router';
import FacebookIcon from 'material-ui-community-icons/icons/facebook-box';
import TwitterIcon from 'material-ui-community-icons/icons/twitter-box';
import InstagramIcon from 'material-ui-community-icons/icons/instagram';
import config from '../../config';
import ReactGA from 'react-ga';

export default class Footer extends React.Component {

  AppStoreGA() {
    ReactGA.event({
      category: 'Play',
      action: 'AppDownload',
      label: "AppStore",
      nonInteraction: true
    });
  }

  PlayStoreGA() {
    ReactGA.event({
      category: 'Play',
      action: 'AppDownload',
      label: "AppStore",
      nonInteraction: true
    });
  }

  render() {
    return (
      <footer>
        <div className="row footer-upper">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div className="row">
              <div className="col-xs-12 col-s-12 col-md-12 col-lg-12">
                <p>Download</p><h1 style={{display: "inline-block", fontSize: "22px", color: "#BBBBBD", padding: "0 5px"}}>Nosey</h1><p>now on</p>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>
              <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                <div className="row footer-platforms">
                  <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <a target="_blank" href={config.app.links.roku}>
                      <img className="img-responsive" src="//s3.amazonaws.com/nosey-website/ftr_roku_download.png"/>
                    </a>
                  </div>
                  <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <a target="_blank" href={config.app.links.ios} onClick={this.AppStoreGA}>
                      <img className="img-responsive" src="//s3.amazonaws.com/nosey-website/ftr_applestore_download.png"/>
                    </a>
                  </div>
                  <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <a target="_blank" href={config.app.links.appleTv} onClick={this.AppStoreGA}>
                      <img className="img-responsive" src="//s3.amazonaws.com/nosey-website/ftr_appletv_download.png"/>
                    </a>
                  </div>
                  <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <a target="_blank" href={config.app.links.android} onClick={this.PlayStoreGA}>
                      <img className="img-responsive" src="//s3.amazonaws.com/nosey-website/ftr_googleplay_download.png"/>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>
            </div>
          </div>
        </div>
        <div className="row footer-lower">
          <div className="col-md-6">
            <IndexLink to="about">About Us</IndexLink>
            <IndexLink to="terms-of-service">Terms Of Service</IndexLink>
            <IndexLink to="privacy-policy">Privacy Policy</IndexLink>
            <IndexLink to="faq">FAQ</IndexLink>
          </div>
          <div className="col-md-6">
            <Link to="http://www.instagram.com/getnosey" target="_blank"><InstagramIcon className="footer-icon"
                                                                                        style={{ color: '#61F061' }}/></Link>
            <Link to="http://www.twitter.com/getnosey" target="_blank"><TwitterIcon className="footer-icon"
                                                                                    style={{ color: '#61F061' }}/></Link>
            <Link to="http://www.facebook.com/getnosey" target="_blank"><FacebookIcon className="footer-icon"
                                                                                      style={{ color: '#61F061' }}/></Link>
          </div>
        </div>
      </footer>
    );
  }
}
