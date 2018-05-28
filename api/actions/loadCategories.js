import * as types from './actionTypes';
import config from '../../src/config';

import axios from 'axios';

const requestCategoriesData = () => {
  return { type: types.REQUEST_CATEGORIES_DATA };
};

const receiveCategoriesData = (json) => {
  return {
    categories: json.categories
  };
};

const receiveCategoriesError = (json) => {
  return {
    error: json
  };
};

export default function loadCategories(req) {
  return new Promise((resolve, reject) => {
    const { token, countryCode } = req.body;
    if (token && countryCode) {
      axios.get(`${config.api.baseUrl}/categories/${countryCode}?token=${token}`)
        .then(function(response) {
          return resolve(receiveCategoriesData(response.data));
        })
        .catch(function(error) {
          return reject(receiveCategoriesError(error));
        });
    } else {
      return reject(receiveCategoriesError({ message: 'Missing required parameters.' }));
    }
  });
}
