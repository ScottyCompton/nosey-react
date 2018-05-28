import * as types from './actionTypes';
import config from '../../src/config';

import axios from 'axios';

const requestPointsData = () => {
  return { type: types.REQUEST_POINTS_DATA };
};

const receivePointsData = (json) => {
  return {
    started: json.data["continue-watching"],
    complete: json.data["watch-again"]
  };
};

const receivePointsError = (json) => {
  return {
    error: json
  };
};

export default function loadUserPoints(req) {
  requestPointsData();
  return new Promise((resolve, reject) => {
    const { token, clientToken } = req.body;
    if (token && clientToken) {
      axios.get(`${config.api.baseUrl}/users/resumption/videos`, {
        headers: {
          'x-access-token': token,
          'x-client-token': clientToken }
      })
      .then(function(response) {
        return resolve(receivePointsData(response.data));
      })
      .catch(function(error) {
        return reject(receivePointsError(error));
      });
    } else {
      return reject(receivePointsError({ message: 'Missing required headers for call to load user points data.' }));
    }
  });
}
