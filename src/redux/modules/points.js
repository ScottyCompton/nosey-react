import * as types from '../../../api/actions/actionTypes';

const initialState = {
  started: [],
  complete: [],
  loaded: false,
  error: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.REQUEST_POINTS_DATA:
      return {
        ...state,
        loaded: false
      };
    case types.RECEIVE_POINTS_DATA:
      return {
        ...state,
        started: action.result.started,
        complete: action.result.complete,
        loaded: true
      };
    case types.RECEIVE_POINTS_ERROR:
      return {
        ...state,
        loaded: true,
        error: action.error
      };
    default:
      return state;
  }
}

export function load(token, clientToken) {
  return {
    types: [types.REQUEST_POINTS_DATA, types.RECEIVE_POINTS_DATA, types.RECEIVE_POINTS_ERROR],
    promise: (client) => client.post('/loadUserPoints', {
      data: {
        token: token,
        clientToken: clientToken
      }
    })
  };
}
