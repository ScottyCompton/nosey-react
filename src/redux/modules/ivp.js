import * as types from '../../../api/actions/actionTypes';

const initialState = {
  channels: [
    {
      _id: '0',
      description: '',
      poster: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO0+Q8AAX0BPfL/26EAAAAASUVORK5CYII=',
      title: 'Loading...',
    }
  ],
  loaded: false,
  error: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.REQUEST_IVP_RAIL_CHANNELS:
      return {
        ...state,
        loaded: false
      };
    case types.RECEIVE_IVP_RAIL_CHANNELS_DATA:
      return {
        ...state,
        channels: action.result.channels,
        loaded: true
      };
    case types.RECEIVE_IVP_RAIL_CHANNELS_ERROR:
      return {
        ...state,
        loaded: true,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.apiAccess && globalState.apiAccess.token && globalState.hero && globalState.hero.loaded;
}

export function load(token, countryCode, slug, childSlug) {
  return {
    types: [types.REQUEST_IVP_RAIL_CHANNELS_DATA, types.RECEIVE_IVP_RAIL_CHANNELS_DATA, types.RECEIVE_IVP_RAIL_CHANNELS_ERROR],
    promise: (client) => client.post('/loadIVPSeasons', {
      data: {
        token: token,
        countryCode: countryCode,
        slug: slug,
        childSlug: childSlug
      }
    })
  };
}
