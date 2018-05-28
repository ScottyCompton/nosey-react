import * as types from '../../../api/actions/actionTypes';

const initialState = {
  channels: [{
    _id: '0',
    description: '',
    poster: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO0+Q8AAX0BPfL/26EAAAAASUVORK5CYII=',
    title: 'Loading...',
  }],
  loading: false,
  loaded: false,
  error: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.REQUEST_GRID_DATA:
      return {
        ...state,
        loaded: false
      };
    case types.RECEIVE_GRID_DATA:
      return {
        ...state,
        channels: action.result.channels,
        loaded: true
      };
    case types.RECEIVE_GRID_ERROR:
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
  return globalState.apiAccess && globalState.apiAccess.token && globalState.grid && globalState.grid.loaded;
}

export function loadGridChannels(token, countryCode, category) {
  return {
    types: [types.REQUEST_GRID_DATA, types.RECEIVE_GRID_DATA, types.RECEIVE_GRID_ERROR],
    promise: (client) => client.post('/loadGridChannels', {
      data: {
        token: token,
        countryCode: countryCode,
        category: category
      }
    })
  };
}
