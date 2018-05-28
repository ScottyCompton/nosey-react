import * as types from './actionTypes';
import config from '../../src/config';

import axios from 'axios';

const requestIVPVideo = () => {
  return {
    type: types.REQUEST_IVP_VIDEO
  };
};

const receiveIVPVideo = (json) => {
  return {
    video: json,
    loaded: true
  };
};

const receiveIVPVideoError = (json) => {
  return {
    error: json
  };
};

export default function loadIVPVideo(req) {
  return new Promise((resolve, reject) => {
    const settings = {
      token: req.body.token,
      video_id: req.body.videoId
    };

    const url = `${config.api.baseUrl}/video/play2/${settings.video_id}?token=${settings.token}`;

    if (settings.token && settings.video_id) {
      axios.get(url)
        .then(function(response) {
          return resolve(receiveIVPVideo(response.data));
        })
        .catch(function(error) {
          return reject(receiveIVPVideoError(error));
        });
    } else {
      return reject(receiveIVPVideoError({
        message: 'Missing required parameters.'
      }));
    }
  });
}
