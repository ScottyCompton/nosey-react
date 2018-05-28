import React from 'react';
import { PropTypes } from 'prop-types';
import IconButton from 'material-ui/IconButton';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';

export default class RailPrevNextArrow extends React.Component {
  static propTypes = {
    whichArrow: PropTypes.string.isRequired,
    onClick: PropTypes.func
  };

  render() {
    const arrClass = "slick-arrow slick-" + this.props.whichArrow + "-arrow";
    const styles = {
      arrIcon: {
        width: 90,
        height: 90,
      },
      arrBtn: {
        width: 150,
        height: 150,
        padding: 30,
        position: 'absolute',
      },
    };


    if (this.props.whichArrow === 'left') {
      return (
        <IconButton onClick={this.props.onClick} className={arrClass} iconStyle={styles.arrIcon} style={styles.arrBtn}>
          <ChevronLeft color={'#61f061'} hoverColor={'#FFFFFF'}/>
        </IconButton>
      );
    } else {
      return (
        <IconButton onClick={this.props.onClick} className={arrClass} iconStyle={styles.arrIcon} style={styles.arrBtn}>
          <ChevronRight color={'#61f061'} hoverColor={'#FFFFFF'}/>
        </IconButton>
      );
    }
  }
}
