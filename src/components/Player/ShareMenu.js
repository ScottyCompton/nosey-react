import React from 'react';
import { PropTypes } from 'prop-types';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

import Share from 'material-ui/svg-icons/social/share';
import FacebookIcon from 'material-ui-community-icons/icons/facebook';
import TwitterIcon from 'material-ui-community-icons/icons/twitter';
import GooglePlusIcon from 'material-ui-community-icons/icons/google-plus';
import TumblrIcon from 'material-ui-community-icons/icons/tumblr';
import PinterestIcon from 'material-ui-community-icons/icons/pinterest';

export default class PlayerControlBar extends React.Component {
  static propTypes = {
    id: PropTypes.string.required,
    title: PropTypes.string.required,
    description: PropTypes.string,
    seriestitle: PropTypes.string,
    poster: PropTypes.string.required
  };

  windowPopUp(provider, width = 500, height = 300) {
    const id = this.props.id;
    let title = encodeURIComponent(this.props.title);
    const description = this.props.description ? encodeURIComponent(this.props.description) : "";
    const seriestitle = this.props.seriestitle ? encodeURIComponent(this.props.seriestitle) : "";
    const poster = encodeURIComponent(this.props.poster);

    let pageUrl = encodeURIComponent(window.location.href);
    if (pageUrl.indexOf('/video/') < 0) {
      pageUrl = pageUrl + '/video/' + id;
    }
    let shareUrl = "";

    if (seriestitle && seriestitle !== "") title = title + " - " + seriestitle;

    switch (provider) {
      case "facebook":
        shareUrl = "//www.facebook.com/sharer/sharer.php?u=" + pageUrl + "&title=" + title + "&description=" + description + "&picture=" + poster;
        break;
      case "twitter":
        shareUrl = "//twitter.com/intent/tweet?original_referer=https%3A%2F%2Fabout.twitter.com%2Fresources%2Fbuttons&text=" + title + "&tw_p=tweetbutton&url=" + pageUrl;
        break;
      case "googleplus":
        shareUrl = "//plus.google.com/share?url=" + pageUrl;
        break;
      case "tumblr":
        shareUrl = "//www.tumblr.com/share?v=3&u=" + pageUrl + "&t=" + title;
        break;
      case "pinterest":
        shareUrl = "//pinterest.com/pin/create/button/?url=" + pageUrl + "&poster=" + poster + "&description=" + title + "&is_video=true";
        break;
      default:
        return;
    }

    // console.log("WindowpopUp called with title %s and poster %s ", title, poster);

    // Calculate the position of the popup so
    // it’s centered on the screen.
    const left = (screen.width / 2) - (width / 2);
    const top = (screen.height / 2) - (height / 2);
    window.open(
      shareUrl,
      "_new",
      "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left
    );
  }

  render() {
    const styles = require("./share-menu.less");

    const { title, seriestitle } = this.props;
    console.log("SHARE MENU: ", title, seriestitle);

    return (
      <div className="shareMenu">
        <IconMenu
          iconButtonElement={<IconButton tooltip="Share"><Share/></IconButton>}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          maxHeight={400}
          onItemTouchTap={(event, child) => this.windowPopUp(child.props.className)}
        >

          {/* <span>Share</span> */}

          <MenuItem className="facebook">
            <IconButton>
              <FacebookIcon/>
            </IconButton>
          </MenuItem>
          <MenuItem className="twitter">
            <IconButton>
              <TwitterIcon/>
            </IconButton>
          </MenuItem>
          <MenuItem className="googleplus">
            <IconButton>
              <GooglePlusIcon/>
            </IconButton>
          </MenuItem>
          <MenuItem className="tumblr">
            <IconButton>
              <TumblrIcon/>
            </IconButton>
          </MenuItem>
          <MenuItem className="pinterest">
            <IconButton>
              <PinterestIcon/>
            </IconButton>
          </MenuItem>
          <p></p>
        </IconMenu>
      </div>
    );
  }
}
