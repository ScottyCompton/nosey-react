import * as types from './actionTypes';
import config from '../../src/config';

import axios from 'axios';

const requestHeroData = () => {
  return {
    type: types.REQUEST_HERO_DATA
  };
};

const receiveHeroData = (json) => {
  return {
    channels: json.channels,
    category: json.category,
    categories: json.categories
  };
};

const receiveHeroError = (json) => {
  return {
    error: json
  };
};

export default function loadHeroChannels(req) {
  return new Promise((resolve, reject) => {
    const settings = {
      category: req.body.category,
      limit: 5,
      page: 1,
      token: req.body.token,
      countryCode: req.body.countryCode
    };

    if (settings.token && settings.countryCode && settings.category) {
      axios.get(`${config.api.baseUrl}/channels/${settings.countryCode}/${settings.category}?token=${settings.token}`)
        .then(function (response) {
          return resolve(receiveHeroData(response.data));
        })
        .catch(function (error) {
          return reject(receiveHeroError(error));
        });
    } else {
      return reject(receiveHeroError({
        message: 'Missing required parameters.'
      }));
    }
  });
}