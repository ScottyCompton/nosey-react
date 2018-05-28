import * as types from './actionTypes';
import config from '../../src/config';

import axios from 'axios';

const requestResumptionDataSend = () => {
  return {
    type: types.REQUEST_RESUMPTION_DATA_SEND
  };
};

const receiveResumptionDataSend = (json) => {
  return {
    sent: true
  };
};

const receiveResumptionDataSendError = (json) => {
  return {
    error: json
  };
};

export default function sendResumptions(req) {
  console.log("sendResumptions called...");
  return new Promise((resolve, reject) => {
    const settings = {
      token: req.body.token,
      client_token: req.body.client_token,
      video_id: req.body.video_id,
      seconds: req.body.seconds
    };

    if (settings.token && settings.client_token && settings.video_id && settings.seconds) {
		const url = `${config.api.baseUrl}/users/videos/point/${settings.video_id}/${settings.seconds}`;
	    const headers = {
		  headers: {'x-access-token': settings.token, 'x-client-token': settings.client_token}
		};
      axios.post(url, {}, headers)
        .then(function(response) {
          return resolve(receiveResumptionDataSend(response.data));
        })
        .catch(function(error) {
          return reject(receiveResumptionDataSend(error));
        });
    } else {
      return reject(receiveResumptionDataSendError({
        message: 'Missing required parameters.'
      }));
    }
  });
}
