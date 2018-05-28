import React from 'react';
import { PropTypes } from 'prop-types';

export default class MyComments extends React.Component {
  static propTypes = {
    location: PropTypes.string,
    shareURL: PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    if (FB) FB.XFBML.parse();
  }

  render() {
    const { shareURL, location } = this.props;
    const toShare = window.location.href;
    return (
      <span><a name="comments"></a>
        <div
          className="fb-comments"
          data-colorscheme="dark"
          data-width="100%"
          data-href={toShare}
          data-numposts="10"
        ></div>
      </span>
    );
  }
}
