import * as types from './actionTypes';
import config from '../../src/config';

import axios from 'axios';

const requestGridData = () => {
  return {
    type: types.REQUEST_GRID_DATA
  };
};

const receiveGridData = (json) => {
  return {
    channels: json.channels
  };
};

const receiveGridError = (json) => {
  return {
    error: json
  };
};

export default function loadGridChannels(req) {
  return new Promise((resolve, reject) => {
    const settings = {
      token: req.body.token,
      countryCode: req.body.countryCode,
      category: req.body.category
    };
    if (settings.token && settings.countryCode && settings.category) {
      axios.get(`${config.api.baseUrl}/channels/${settings.countryCode}/${settings.category}?token=${settings.token}`)
        .then(function(response) {
          return resolve(receiveGridData(response.data));
        })
        .catch(function(error) {
          return reject(receiveGridError(error));
        });
    } else {
      return reject(receiveGridError({
        message: 'Missing required parameters to display Grid page.'
      }));
    }
  });
}
