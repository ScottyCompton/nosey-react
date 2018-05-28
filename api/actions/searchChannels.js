import * as types from './actionTypes';
import config from '../../src/config';

import axios from 'axios';

const requestSearchChannelsData = () => {
  return { type: types.REQUEST_SEARCH_CHANNELS_DATA };
};

const receiveSearchChannelsData = (json) => {
  return {
    channels: json.data.hits
  };
};

const receiveSearchChannelsError = (json) => {
  return {
    error: json
  };
};

export default function searchChannels(req) {
  return new Promise((resolve, reject) => {
    const { token, query } = req.body;
    if (token) {
      if (query.length >= 2) {
        axios.get(`${config.api.baseUrl}/search/?q=${query}&token=${token}`)
          .then(function(response) {
            return resolve(receiveSearchChannelsData(response.data));
          })
          .catch(function(error) {
            return reject(receiveSearchChannelsError(error));
          });
      }
    } else {
      return reject(receiveSearchChannelsError({ message: 'Missing required parameters.' }));
    }
  });
}
