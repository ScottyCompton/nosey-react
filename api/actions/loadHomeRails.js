import * as types from './actionTypes';
import config from '../../src/config';

import axios from 'axios';

const requestHomeRailData = () => {
  return {
    type: types.REQUEST_HOME_RAIL_CHANNELS_DATA
  };
};

const receiveHomeRailData = (json) => {
  return {
    results: json
  };
};

const receiveHomeRailError = (json) => {
  return {
    error: json
  };
};

export default function loadHomeRails(req) {
  return new Promise((resolve, reject) => {
    const settings = {
      token: req.body.token,
      countryCode: req.body.countryCode
    };

    if (settings.token && settings.countryCode) {
      axios.get(`${config.api.baseUrl}/homepage?token=${settings.token}`)
        .then( function(response) {
          return resolve(response.data.homepage);
        })
        .catch( function(error) {
          return reject(receiveHomeRailError(error));
        });
    } else {
      return reject(receiveHomeRailError({
        message: 'Missing required parameters.'
      }));
    }
  });
}
