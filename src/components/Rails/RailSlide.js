import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router';
import { MediaBlock, RectShape, RoundShape, TextBlock, TextRow } from 'react-placeholder/lib/placeholders';
import { updateProgressBar } from 'redux/modules/progress';
import Preloader from './RailSlidePlaceholder';
import ImageLoader from 'react-imageloader';
import ReactGA from 'react-ga';

export default class RailSlide extends Component {
  static propTypes = {
    url: PropTypes.string,
    title: PropTypes.string,
    seriesTitle: PropTypes.string,
    poster: PropTypes.string,
    slideId: PropTypes.string,
    isSingleChannel: PropTypes.bool,
    selected: PropTypes.bool,
    preloader: PropTypes.func,
    percentageWatched: PropTypes.number,
    startTime: PropTypes.number
  };

  constructor(props) {
    super(props);
  }

  slidePreloader() {
    return (
      <Preloader />
    );
  }

  PlayButtonClick() {
    const url = this.to;
    if (url.indexOf("/video/") < 0) return;
    const id = url.split("/video/")[1].split("?")[0];
    ReactGA.event({
      category: 'Play',
      action: 'PlayButtonClick',
      label: id,
      nonInteraction: true
    });
  }

  render() {
    const { url, seriesTitle, title, isSingleChannel, selected, slideId, percentageWatched, startTime } = this.props;
    let linkTo = "/";
    if (url && startTime && percentageWatched < 0.95) {
      linkTo = url + "?t=" + startTime;
    } else if (url) {
      linkTo = url;
    }
    let loadComplete = true;
    let metaSeriesTitle = [];
    let metaTitle = [];
    let metaInfoClassName = [];
    let statusBar = null;
    let watched = false;

    if (seriesTitle || isSingleChannel) {
      if (percentageWatched) {
        let statusPct = {
          width: percentageWatched * 100 + '%'
        };
        statusBar = (
          <div className="statusBar">
            <div className="statusPct" style={statusPct}></div>
          </div>
        );
      }

      metaInfoClassName.push('metaInfo');
      metaTitle.push(<h4 key="0" className="metaTitle">{title}</h4>);
      if (seriesTitle) metaSeriesTitle.push(<h4 key="0" className="metaSeriesTitle">{seriesTitle}</h4>);
    }

    return (
      <div className={"railItem " + (selected ? "selected" : "")}>
        <Link to={linkTo} onClick={this.PlayButtonClick}>
          <ImageLoader src={this.props.poster} className={"img-responsive  " + (watched ? " watched" : "")}
                       preloader={this.slidePreloader}/>
          {statusBar}
          <div className={metaInfoClassName}>
            {metaTitle}
            {metaSeriesTitle}
          </div>
        </Link>
      </div>
    );
  }

}
