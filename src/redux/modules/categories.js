import * as types from '../../../api/actions/actionTypes';

const initialState = {
  categories: [],
  loaded: false,
  error: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.REQUEST_CATEGORIES_DATA:
      return {
        ...state,
        loaded: false
      };
    case types.RECEIVE_CATEGORIES_DATA:
      return {
        ...state,
        categories: action.result.categories,
        loaded: true
      };
    case types.RECEIVE_CATEGORIES_ERROR:
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
  return globalState.apiAccess && globalState.apiAccess.token && globalState.categories && globalState.categories.loaded;
}

export function load(token, countryCode) {
  return {
    types: [types.REQUEST_CATEGORIES_DATA, types.RECEIVE_CATEGORIES_DATA, types.RECEIVE_CATEGORIES_ERROR],
    promise: (client) => client.post('/loadCategories', {
      data: {
        token: token,
        countryCode: countryCode
      }
    })
  };
}
