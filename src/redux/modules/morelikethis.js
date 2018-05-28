import * as types from '../../../api/actions/actionTypes';

const initialState = {
  results: [],
  loading: false,
  loaded: false,
  error: null
};

export default function reducer(state = initialState, action = {}) {
  const newState = {...state};

  switch (action.type) {
    case types.REQUEST_MORE_LIKE_THIS_DATA: {
      newState.loading = true;
      break;
    }
    case types.RECEIVE_MORE_LIKE_THIS_ERROR: {
      newState.loading = false;
      newState.error = action.result;
      break;
    }
    case types.RECEIVE_MORE_LIKE_THIS_DATA: {
      const videosToRail = action.result.result.channels[0].playlist.map((video) => {
            return {
              id: video._id,
              spotlight_poster: "//f9q4g5j6.ssl.hwcdn.net/" + video.thumb,
              slug: "/more-like-this/video/" + video._id,
              title: video.title,
              videoUrl: "/more-like-this/more-like-this/video/" + video._id,
              seriesTitle: video.seriestitle
            };
          });
      newState.loading = false;
      newState.loaded = true;
      newState.results = Object.assign({}, {playlist: videosToRail});
      break;
    }

    default : return newState;
  }

  return newState;
}

export function isLoaded(globalState) {
  return globalState.apiAccess && globalState.apiAccess.token && globalState.morelikethis && globalState.morelikethis.loaded;
}

export function load(token, countryCode) {
  return {
    types: [types.REQUEST_MORE_LIKE_THIS_DATA, types.RECEIVE_MORE_LIKE_THIS_DATA, types.RECEIVE_MORE_LIKE_THIS_ERROR],
    promise: (client) => client.post('/loadMoreLikeThis', {
      data: {
        token: token,
        countryCode: countryCode
      }
    })
  };
}
