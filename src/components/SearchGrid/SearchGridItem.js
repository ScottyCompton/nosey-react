import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router';
import Preloader from '../Rails/RailSlidePlaceholder';
import ImageLoader from 'react-imageloader';

export default class GridItem extends React.Component {
  static propTypes = {
    _id: PropTypes.string.isRequired,
    _source: PropTypes.object.isRequired,
    _type: PropTypes.string.isRequired,
    spotlight_poster: PropTypes.string,
    slug: PropTypes.string,
    itemType: PropTypes.string
  };

  slidePreloader() {
    return (
      <Preloader />
    );
  }

  render() {
    // decide if item is a video or a channel so we can make it's slug properly
    const type = this.props._type === 'channel' ? 'channel' : 'video';
    const title = this.props._source.title ? this.props._source.title : 'Loading...';
    const seriesTitle = this.props._source.seriestitle;
    let poster = '';
    let link = '';
    let statusBar = null;
    let metaSeriesTitle = [];
    let metaTitle = [];
    let metaInfoClassName = [];

    if (type === 'channel') {
      poster = this.props.spotlight_poster + "/300/168";
      if (this.props.itemType && this.props.itemType === 'searchResult') {
        link = '/channel/' + this.props.slug;
      } else {
        link = this.props.slug;
      }
    } else if (this.props._source.thumb) {
      poster = "//image.dotstudiopro.com/" + this.props._source.thumb + "/300/168";
      link = '/video/' + this.props._id;

      // this is temporary until actual pct watched is available
      let statusPct = {
        width: Math.floor(Math.random() * 101) + '%'
      };

      statusBar = (
        <div className="statusBar">
          <div className="statusPct" style={statusPct}></div>
        </div>
      );

      metaInfoClassName.push('metaInfo');
      metaTitle.push(<h4 key="0" className="metaTitle">{title}</h4>);
      if (seriesTitle) metaSeriesTitle.push(<h4 key="0" className="metaSeriesTitle">{seriesTitle}</h4>);
    } else {
      link = '/video/' + this.props._id;
    }


    return (
      <div className="searchGridItem">
        <Link to={link}>
          <ImageLoader src={poster} className="img-responsive" preloader={this.slidePreloader}/>
          {/* {statusBar} */}
          <div className={metaInfoClassName}>
            {metaTitle}
            {metaSeriesTitle}
          </div>
        </Link>
      </div>
    );
  }
}
