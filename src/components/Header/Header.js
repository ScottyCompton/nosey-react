import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router';
import 'babel-polyfill';
import { FormattedMessage } from 'react-intl';

import AppBar from 'material-ui/AppBar';
import Clear from 'material-ui/svg-icons/content/clear';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import Lock from './Lock';
import NavMenu from './NavMenu';
import SearchBar from './SearchBar';

import theme from 'theme/theme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default class Header extends Component {
  static childContextTypes = {
    muiTheme: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      navOpen: "hide",
      navOver: false,
      subNavOver: false,
      rightSidebarOpen: false
    };
  }

  getChildContext() {
    return { muiTheme: getMuiTheme(theme) };
  }

  toggleNav() {
    // console.log("Toggle me");
    const css = (this.state.navOpen === "hide") ? "show" : "hide";
    this.setState({ navOpen: css });
  }

  navBtnOver() {
    this.setState({ navOver: true, navOpen: 'show' });
  }

  navBtnOff() {
    this.setState({ navOver: false });
    if (!this.state.subNavOver) {
      this.setState({ navOpen: 'hide' });
    }
  }

  subNavOver() {
    this.setState({ subNavOver: true, navOpen: 'show' });
  }

  subNavOut() {
    this.setState({ subNavOver: false });
    if (!this.state.navOver) {
      this.setState({ navOpen: 'hide' });
    }
  }


  toggleRightSidebar = () => this.setState({ rightSidebarOpen: !this.state.rightSidebarOpen });

  render() {
    const styles = {
      closeRightSidebar: {
        cursor: 'pointer',
        transform: 'translateY(15px)',
        marginRight: '8px'
      },
      openRightSidebar: {
        transform: 'translateY(5px)',
        marginRight: '8px'
      }
    };

    let zStyle = { 'zIndex': '2000!important' };
    const headerStyles = require('./style.less');
    return (
      <div>
        <AppBar className="nav" style={zStyle}
                iconElementLeft={ // Left button group
                  <div>
                    <Link to={'/'}>
                      <img className="navBrand" src="//f9q4g5j6.ssl.hwcdn.net/58a4ccc499f8151920cb59f5/155/40"/>
                    </Link>

                    <FlatButton
                      label={<FormattedMessage id="header.browse" defaultMessage="BROWSE"/>}
                      className="hdr-btn"
                      onMouseEnter={this.navBtnOver.bind(this)}
                      onMouseLeave={this.navBtnOff.bind(this)}
                      onClick={this.toggleNav.bind(this)}/>

                    <div className={'theNavArea ' + this.state.navOpen}>
                      <NavMenu mouseOverHandler={this.subNavOver.bind(this)}
                               mouseOutHandler={this.subNavOut.bind(this)}/>
                    </div>

                    <Lock />
                  </div>
                }
                iconElementRight={ // Right button group
                  <div>
                    <SearchBar />

                    {/* <IconButton style={styles.openRightSidebar} onClick={this.toggleRightSidebar}>
                     <Toc />
                     </IconButton> */}
                  </div>
                }
        />

        <Drawer width={300} openSecondary={Boolean(true)} open={this.state.rightSidebarOpen}>
          <AppBar
            title="Menu"
            iconElementLeft={<Clear style={styles.closeRightSidebar} onClick={this.toggleRightSidebar}/>}
          />

          <List className="navMenu">
            {/* <Link to={'/about'}><ListItem primaryText="About"/></Link>
             <Link to={'/faq'}><ListItem primaryText="FAQ"/></Link> */}
            <Link to={'/privacy-policy'}><ListItem primaryText="Privacy Policy"/></Link>
            <Link to={'/terms-of-service'}><ListItem primaryText="Terms"/></Link>
          </List>
        </Drawer>
      </div>
    );
  }
}
