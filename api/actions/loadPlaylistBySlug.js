import * as types from './actionTypes';
import config from '../../src/config';

import axios from 'axios';

const requestRailPlaylistData = () => {
  return {
    type: types.REQUEST_HOME_RAIL_PLAYLISTS
  };
};

const receiveRailPlaylistData = (json) => {
  return {
    payload: json.channels[0].playlist,
    channel_slug: json.channels[0].slug,
    slug: json.category[0].slug
  };
};

const receiveHomePlaylistError = (json) => {
  return {
    error: json
  };
};

// some rails on the home page have just a single channel with a playlist inside
// for these we need to get a different call to get the playlist data
export default function loadPlaylistBySlug(req) {
  return new Promise((resolve, reject) => {
    const settings = {
      token: req.body.token,
      countryCode: req.body.countryCode,
      slug: req.body.slug
    };
    // requestRailPlaylistData();

    if (settings.token && settings.countryCode && settings.slug) {
      axios.get(`${config.api.baseUrl}/channels/${settings.countryCode}/${settings.slug}?token=${settings.token}`)
        .then( function(response) {
          return resolve(receiveRailPlaylistData(response.data));
        })
        .catch( function(error) {
          console.log("ERROR: ", error);
          return reject(receiveHomePlaylistError(error));
        });
    } else {
      return reject(receiveHomePlaylistError({
        message: 'Missing required parameters in call to get Rail Playlist data for home page.'
      }));
    }
  });
}
