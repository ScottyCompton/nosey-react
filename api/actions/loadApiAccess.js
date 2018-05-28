import * as types from './actionTypes';
import config from '../../src/config';

import axios from 'axios';

const requestTokenData = () => {
  return { type: types.REQUEST_API_ACCESS_DATA };
};

const receiveTokenData = (json) => {
  return {
    token: json.token
  };
};

const receiveTokenError = (json) => {
  return {
    error: json
  };
};

const receiveCountryCodeData = (json, token) => {
  return {
    token: token,
    countryCode: json.data && json.data.countryCode ? json.data.countryCode : config.api.defaultCountryCode
  };
};

const receiveCountryCodeError = (json) => {
  return {
    error: json
  };
};

export default function loadApiAccess(req) {
  const clientIpAddress = req.body.clientIpAddress;
  return new Promise((resolve, reject) => {
    axios({
      url: `${config.api.baseUrl}/token?key=${config.api.noseyApiKey}`,
      timeout: config.api.timeout,
      method: 'post',
      responseType: 'json'
    })
      .then((response) => {
        const tokenResponse = receiveTokenData(response.data);
        const token = tokenResponse.token;
        const defaultCountryResponse = { data: { countryCode: config.api.defaultCountryCode } };

        if (config.geoBlock) {
          if (clientIpAddress) {
            axios({
              url: `${config.api.baseUrl}/country`,
              headers: { 'x-access-token': token },
              timeout: config.api.timeout,
              method: 'post',
              responseType: 'json',
              data: { ip: clientIpAddress }
            })
              .then(function(resp) {
                resolve(receiveCountryCodeData(resp.data, token));
              })
              .catch(function(error) {
                if (process.env.NODE_ENV !== 'production') {
                  console.error('loadApiAccess: receiveCountryCodeError: ', error);
                }
                resolve(receiveCountryCodeData(defaultCountryResponse, token));
              });
          } else {
            resolve(receiveCountryCodeData({}, token));
          }
        } else {
          resolve(receiveCountryCodeData(defaultCountryResponse, token));
        }
      })
      .catch((response) => {
        console.error('receiveTokenError: response: ', response);
        reject(receiveTokenError(response.data));
      });
  });
}
