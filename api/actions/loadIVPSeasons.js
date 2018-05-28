import * as types from './actionTypes';
import config from '../../src/config';

import axios from 'axios';

const requestIVPSeasonsData = () => {
  return {
    type: types.REQUEST_IVP_RAIL_CHANNELS_DATA
  };
};

const receiveIVPSeasonsData = (json) => {
  return {
    channels: json.channels,
    loaded: true
  };
};

const receiveIVPSeasonsError = (json) => {
  return {
    error: json
  };
};

export default function loadIVPSeasons(req) {
  return new Promise((resolve, reject) => {
    const settings = {
      token: req.body.token,
      countryCode: req.body.countryCode,
      slug: req.body.slug,
      childSlug: req.body.childSlug
    };

    let childSlug = "";

    if (typeof settings.childSlug !== 'undefined') {
      childSlug = "/" + settings.childSlug;
    }

    if (settings.token && settings.countryCode) {
      axios.get(`${config.api.baseUrl}/channel/${settings.countryCode}/${settings.slug}${childSlug}?token=${settings.token}`)
        .then(function(response) {
          return resolve(receiveIVPSeasonsData(response.data));
        })
        .catch(function(error) {
          return reject(receiveIVPSeasonsError(error));
        });
    } else {
      return reject(receiveIVPSeasonsError({
        message: 'Missing required parameters.'
      }));
    }
  });
}
