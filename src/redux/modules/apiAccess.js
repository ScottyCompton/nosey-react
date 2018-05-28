import * as types from '../../../api/actions/actionTypes';

const initialState = {
  token: null,
  countryCode: null,
  loaded: false,
  error: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.REQUEST_API_ACCESS_DATA:
      return {
        ...state,
        loaded: false
      };
    case types.RECEIVE_API_ACCESS_DATA:
      return {
        ...state,
        token: action.result.token,
        countryCode: action.result.countryCode,
        loaded: true
      };
    case types.RECEIVE_API_ACCESS_ERROR:
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
  return globalState.apiAccess && globalState.apiAccess.loaded;
}

export function load() {
  return {
    types: [types.REQUEST_API_ACCESS_DATA, types.RECEIVE_API_ACCESS_DATA, types.RECEIVE_API_ACCESS_ERROR],
    promise: (client) => client.post('/loadApiAccess', { data: {} })
  };
}
