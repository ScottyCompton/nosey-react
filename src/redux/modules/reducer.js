import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { pagination } from 'violet-paginator';
import 'babel-polyfill';
import { intlReducer } from 'react-intl-redux';

import apiAccess from './apiAccess';
import categories from './categories';
import grid from './grid';
import hero from './hero';
import home from './home';
import ivp from './ivp';
import player from './player';
import points from './points';
import progress from './progress';
import search from './search';
import morelikethis from './morelikethis';
import resumptionsend from './resumptionsend';
import { reducer as form } from 'redux-form';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  apiAccess,
  categories,
  grid,
  form,
  hero,
  home,
  ivp,
  morelikethis,
  resumptionsend,
  player,
  points,
  progress,
  search,
  intl: intlReducer,
  pagination
});
