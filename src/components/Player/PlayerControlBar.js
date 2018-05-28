import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router';
import IconButton from 'material-ui/IconButton';
import SkipNext from 'material-ui/svg-icons/av/skip-next';
import SkipPrevious from 'material-ui/svg-icons/av/skip-previous';
import ShareMenu from './ShareMenu';
import More from 'material-ui/svg-icons/navigation/more-vert';
import Comment from 'material-ui/svg-icons/communication/comment';

export default class PlayerControlBar extends React.Component {
  static propTypes = {
    currentUrl: PropTypes.string,
    previousVideo: PropTypes.string,
    nextVideo: PropTypes.string,
    videoObj: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      metaDivOpen: "drawer hide-me"
    };
  }

  componentWillMount() {
    this.forceUpdate();
  }

  componentWillReceiveProps(nextProps) {
    this.forceUpdate();
  }

  componentWillUnmount() {
    this.forceUpdate();
  }

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  toggleMetaDrawer() {
    // console.log("Should toggle drawer. current state is: " + this.state.metaDivOpen);
    this.setState({
      'metaDivOpen': this.state.metaDivOpen === 'drawer show-me' ? 'drawer hide-me' : 'drawer show-me'
    });
  }

  render() {
    const styles = require('./player-control-bar.less');

    const { previousVideo, nextVideo, videoObj, currentUrl } = this.props;
    const { metaDivOpen } = this.state;

    // pick share image
    let shareImage = "";
    if (videoObj.socialImage) {
      shareImage = videoObj.socialImage;
    } else if (videoObj.spotlight_poster) {
      shareImage = videoObj.spotlight_poster;
    } else if (videoObj.thumb) {
      shareImage = videoObj.thumb;
    } else {
      shareImage = "https://dke5fmveuky7d.cloudfront.net/img/nosey-card.jpg";
    }

    return (
      <div key="dspPlayerControlBar" className="top-controls row">
        <div className="row">
          <div className="col-xs-1">
            <Link className="video-previous" to={previousVideo ? previousVideo : "" }>
              <IconButton tooltip="Previous">
                <SkipPrevious/>
              </IconButton>
            </Link>
          </div>
          <div className="col-xs-10">
            <div className="row">
              <div className="video-info col-xs-5 col-sm-7">
                <div className="control-bar-title-seriestitle">
                  <h1>{videoObj ? videoObj.title : "Loading..."}</h1>
                  <h3>{videoObj ? videoObj.seriestitle : "Loading..."}</h3>
                </div>
              </div>
              <div className="col-xs-7 col-sm-5">
                <ul className="tools">
                  <li>
                    <IconButton href="#comments" tooltip="Comment">
                      <Comment/>
                    </IconButton>
                  </li>
                  <li>

                    <ShareMenu
                      title={videoObj.title ? videoObj.title : "Nosey"}
                      description={videoObj.description ? videoObj.description : ""}
                      seriestitle={videoObj.seriestitle ? videoObj.seriestitle : ""}
                      id={videoObj._id ? videoObj._id : ""}
                      poster={shareImage}
                    />

                  </li>
                  <li>
                    <IconButton tooltip="More" onClick={this.toggleMetaDrawer.bind(this)}>
                      <More/>
                    </IconButton>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-xs-1">
            <Link className="video-next" to={nextVideo ? nextVideo : ""}>
              <IconButton tooltip="Next">
                <SkipNext/>
              </IconButton>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="below-controlbar-title-seriestitle col-xs-12 hidden-sm-up">
            <h2>{videoObj ? videoObj.title : "Loading..."}</h2>
            <h3>{videoObj ? videoObj.seriestitle : "Loading..."}</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12">
            <div className={metaDivOpen}>
              {/* <span>{videoObj ? Math.round(parseInt(videoObj.duration, 10)/60) + " min" : ""} | {videoObj ? videoObj.language : ""} | {videoObj ? videoObj.country : ""}</span> */}
              <p style={{ 'padding-right': '10px' }}>{videoObj ? videoObj.description : "Loading..."}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
