import * as types from './actionTypes';
import config from '../../src/config';

import axios from 'axios';

const requestMoreLikeThis = () => {
  return {
    type: types.REQUEST_MORE_LIKE_THIS_DATA
  };
};

const receiveMoreLikeThis = (json) => {
  return {
    result: json,
    loaded: true
  };
};

const receiveMoreLikeThisError = (json) => {
  return {
    error: json
  };
};

export default function loadMoreLikeThis(req) {
  return new Promise((resolve, reject) => {
    const settings = {
      token: req.body.token,
      countryCode: req.body.countryCode
    };

    const url = `${config.api.baseUrl}/channels/${settings.countryCode}/more-like-this?token=${settings.token}`;

    if (settings.token) {
      axios.get(url)
        .then(function(response) {
          return resolve(receiveMoreLikeThis(response.data));
        })
        .catch(function(error) {
          return reject(receiveMoreLikeThisError(error));
        });
    } else {
      return reject(receiveIVPVideoError({
        message: 'Missing required parameters.'
      }));
    }
  });
}
