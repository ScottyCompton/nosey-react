import * as types from './actionTypes';
import config from '../../src/config';

import axios from 'axios';

const requestSearchVideosData = () => {
  return { type: types.REQUEST_SEARCH_VIDEOS_DATA };
};

const receiveSearchVideosData = (json) => {
  return {
    videos: json.data.hits
  };
};

const receiveSearchVideosError = (json) => {
  return {
    error: json
  };
};

export default function searchVideos(req) {
  return new Promise((resolve, reject) => {
    const { token, query } = req.body;
    if (token) {
      if (query.length >= 2) {
        axios.get(`${config.api.baseUrl}/search/videos?q=${query}&token=${token}`)
          .then(function(response) {
            return resolve(receiveSearchVideosData(response.data));
          })
          .catch(function(error) {
            return reject(receiveSearchVideosError(error));
          });
      }
    } else {
      return reject(receiveSearchVideosError({ message: 'Missing required parameters.' }));
    }
  });
}
