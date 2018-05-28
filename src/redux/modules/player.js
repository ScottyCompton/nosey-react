import * as types from '../../../api/actions/actionTypes';

const initialState = {
  video: {
    _id: '0',
    description: '',
    poster: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO0+Q8AAX0BPfL/26EAAAAASUVORK5CYII=',
    title: 'Loading...',
  },
  loaded: false,
  loading: false,
  error: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.REQUEST_IVP_VIDEO:
      return {
        ...state,
        loading: true
      };
    case types.RECEIVE_IVP_VIDEO:
      return {
        ...state,
        video: action.result.video,
        loaded: true,
        loading: false
      };
    case types.RECEIVE_IVP_VIDEO_ERROR:
      return {
        ...state,
        loaded: false,
        error: action.error
      };
    case types.RECEIVE_CLEAN_IVP:
      return {
        ...state,
        video: {},
        loaded: true,
        loading: false
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.apiAccess && globalState.apiAccess.token && globalState.hero && globalState.hero.loaded;
}

export function loadIVPVideo(token, videoId) {
  return {
    types: [types.REQUEST_IVP_VIDEO, types.RECEIVE_IVP_VIDEO, types.RECEIVE_IVP_VIDEO_ERROR],
    promise: (client) => client.post('/loadIVPVideo', {
      data: {
        token: token,
        videoId: videoId
      }
    })
  };
}

export function cleanIVPVideo() {
  return {
    types: [types.REQUEST_CLEAN_IVP, types.RECEIVE_CLEAN_IVP],
    promise: (client) => client.post('/cleanIVPVideo', {
      data: {
        clean: true
      }
    })
  };
}
