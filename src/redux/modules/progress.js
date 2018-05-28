import * as types from '../../../api/actions/actionTypes';

const initialState = {
  percentage: 0,
  loaded: false,
  error: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.REQUEST_PROGRESS_BAR_DATA:
      return {
        ...state,
        loaded: false
      };
    case types.RECEIVE_PROGRESS_BAR_DATA:
      return {
        ...state,
        percentage: action.result.percentage,
        loaded: true
      };
    case types.RECEIVE_PROGRESS_BAR_ERROR:
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
  return globalState.progress && globalState.progress.loaded;
}

export function updateProgressBar(percentage) {
  return {
    types: [types.REQUEST_PROGRESS_BAR_DATA, types.RECEIVE_PROGRESS_BAR_DATA, types.RECEIVE_PROGRESS_BAR_ERROR],
    promise: (client) => client.post('/updateProgressBar', {
      data: {
        percentage: percentage
      }
    })
  };
}
