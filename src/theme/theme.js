/*
 This file contains the Material-UI theme variables
 They are automatically injected into Material-UI components and you will likely not have to change this
 */

import { fade } from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

export default {
  spacing: spacing,
  fontFamily: 'Source Sans Pro, sans-serif',
  palette: {
    primary1Color: '#212432',
    primary2Color: '#203248',
    primary3Color: '#F1E55B',
    accent1Color: '#61F061',
    accent2Color: '#55C755',
    accent3Color: '#479D47',
    textColor: '#F0F6FA',
    secondaryTextColor: '#BBBBBD',
    alternateTextColor: '#BBBBBD',
    canvasColor: '#1A1A1A',
    borderColor: '#61F061',
    disabledColor: fade('#61F061', 0.3),
    pickerHeaderColor: '#61F061',
    shadowColor: '#000'
  }
};
