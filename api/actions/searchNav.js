import * as types from './actionTypes';
import config from '../../src/config';

import axios from 'axios';

const requestSearchNavData = () => {
  return { type: types.REQUEST_SEARCH_NAV_DATA };
};

const receiveSearchNavData = (json) => {
  // Need to do lots of data massaging with search results
  // since elastic search has a pretty weird response structure
  const { titleData, actorData, directorData } = json.data;

  const actors = [],
    directors = [],
    titles = [];

  let actorResults = [],
    directorResults = [],
    titleResults = [];

  if (actorData && actorData.results[0] && actorData.results[0].options && actorData.results[0].options.length) {
    actorResults = actorData.results[0].options;
    actorResults.map((title, index) => {
      actors.push({
        name: title.text,
        url: title.url
      })
    });
  }

  if (directorData && directorData.results[0] && directorData.results[0].options && directorData.results[0].options.length) {
    directorResults = titles.results[0].options;
    directorResults.map((title, index) => {
      directors.push({
        name: title.text,
        url: title.url
      })
    });
  }

  if (titleData && titleData.results[0] && titleData.results[0].options && titleData.results[0].options.length) {
    titleResults = titleData.results[0].options;
    titleResults.map((video, index) => {
      titles.push({
        name: video.text,
        url: video.url
      })
    });
  }

  return {
    actors: actors,
    directors: directors,
    titles: titles
  };
};

const receiveSearchNavError = (json) => {
  return {
    error: json
  };
};

export default function searchNav(req) {
  return new Promise((resolve, reject) => {
    const { token, query } = req.body;
    if (token) {
      axios.get(`${config.api.baseUrl}/search/s?q=${query}&token=${etoken}`)
        .then(function(response) {
          return resolve(receiveSearchNavData(response.data));
        })
        .catch(function(error) {
          return reject(receiveSearchNavError(error));
        });
    } else {
      return reject(receiveSearchNavError({ message: 'Missing required parameters.' }));
    }
  });
}
