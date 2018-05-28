import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { load as loadUserPoints } from 'redux/modules/points';

import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Popover from 'material-ui/Popover';
import Avatar from 'material-ui/Avatar';

@connect(
  state => ({
    token: state.apiAccess.token,
    started: state.points.started,
    complete: state.points.complete,
    loaded: state.points.loaded,
    error: state.points.error
  }),
  { loadUserPoints }
)

export default class Profile extends Component {
  static propTypes = {
    token: PropTypes.string.isRequired,
    auth: PropTypes.object, // While working on the search route
    profile: PropTypes.object, // because it was throwing annoying errors
    loadUserPoints: PropTypes.func.isRequired,
    started: PropTypes.array,
    complete: PropTypes.array,
    loaded: PropTypes.bool,
    error: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      loadingPoints: false
    };
  }

  componentDidMount() {
    const { auth } = this.props;
    auth.getProfile((err, profile) => {
      if (profile) {
        this.setState({
          profile: profile
        });
      }
    });
  }

  // When the profile updates we wish to receive user's continue watching data
  componentDidUpdate(prevProps, prevState) {
    const { auth } = this.props;

    if (auth.loggedIn()) {
      const { loaded, token } = this.props;
      const loading = this.state.loadingPoints;
      const profile = this.state.profile;

      if (!loading && !loaded && profile && profile.spotlight) {
        this.setLoadingState();
        const clientToken = profile.spotlight;
        // API call to get this user's points data
        this.props.loadUserPoints(token, clientToken);
      }
    }
  }

  setLoadingState() {
    this.setState({ loadingPoints: true });
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

  render() {
    const profile = this.state && this.state.profile;
    const { auth, started, complete } = this.props;

    // if Auth0 doesn't have user's name then only display the email
    let Display = [];
    if (profile && profile.name && profile.email) {
      Display.push(<div key="0"><MenuItem value={0} primaryText={profile.name}/></div>);
      if (profile.name !== profile.email) {
        Display.push(<div key="1"><MenuItem value={0} primaryText={profile.email}/></div>);
      }
    }

    if (!profile) {
      return (
        /* Figure out a loader */
        <div></div>
      );
    }

    return (
      <div className="user-profile-dropdown">
        <Avatar
          className="menu-avatar"
          src={profile.picture}
          size={34}
          onTouchTap={this.handleTouchTap}
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            {Display}
            <Divider />
            <MenuItem value={1} key="profile.logout" primaryText="Log out" onTouchTap={auth.logout.bind(this)}/>
          </Menu>
        </Popover>
      </div>
    );
  }
}
