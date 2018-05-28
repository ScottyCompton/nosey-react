import * as types from '../../../api/actions/actionTypes';

const initialState = {
  percentage: 0,
  loaded: false,
  error: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.REQUEST_RESUMPTION_DATA_SEND:
      return {
        ...state,
        sent: false
      };
    case types.RECEIVE_RESUMPTION_DATA_SEND:
      return {
        ...state,
        sent: true
      };
    case types.RECEIVE_RESUMPTION_DATA_SEND_ERROR:
      return {
        ...state,
        sent: true,
        error: action.error
      };
    default:
      return state;
  }
}

export function sendResumptions(token, clientToken, videoId, seconds) {
  return {
    types: [types.REQUEST_RESUMPTION_DATA_SEND, types.RECEIVE_RESUMPTION_DATA_SEND, types.RECEIVE_RESUMPTION_DATA_SEND_ERROR],
    promise: (client) => client.post('/sendResumptions', {
      data: {
        token: token,
        client_token: clientToken,
        video_id: videoId,
        seconds: seconds
      }
    })
  };
}
