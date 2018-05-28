import * as types from './actionTypes';
import config from '../../src/config';

import axios from 'axios';

const requestIVPVideo = () => {
  return {
    type: types.REQUEST_CLEAN_IVP
  };
};

const receiveCleanIVPVideo = () => {
  return {
    video: {},
    loaded: true
  };
};

export default function cleanIVPVideo(req) {
  return new Promise((resolve, reject) => {
    return resolve(receiveCleanIVPVideo());
  });
}
