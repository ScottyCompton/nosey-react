import * as types from '../../../api/actions/actionTypes';

// the initial state for search results looks so terrible because
// the data we get from elastic search is really inconsistent
// with our traditional data structure. Please keep this in mind
// and refer to the response from the DSP Search API
// if you need to update/change default values
const initialState = {
  suggester: {
    videos: [],
    actors: [],
    directors: [],
    error: null
  },
  grid: {
    channels: [],
    channelsError: null,
    channelsLoading: false,
    videos: [],
    videosError: null,
    videolsLoading: false,
  },
  reset: false
};

export default function reducer(state = initialState, action = {}) {
  const newState = {...state};
  const grid = {...state.grid};

  switch (action.type) {

    /* Suggester search bar listeners below */
    case types.RECEIVE_SEARCH_NAV_DATA:
      return {
        ...state,
        actors: action.result.actors,
        directors: action.result.directors,
        titles: action.result.titles
      };
    case types.RECEIVE_SEARCH_NAV_ERROR:
      return {
        ...state,
        error: action.error
      };
    /* End listeners for suggester search bar */

    /* Search grid page listeners below */
    case types.RECEIVE_SEARCH_CHANNELS_DATA:
      const parentChannels = [];
      if (action.result.channels) {
        action.result.channels.map((channel, i) => {
          if (channel._source && channel._source.childchannels && channel._source.childchannels.length > 0) {
            parentChannels.push(channel);
          }
          // terrible manual override for jerry springer parent. We are about to launch
          // and there is some sort of Elastic Search issue related to this one channel.
          // Future dev I hope you get to come back to this and delete it one day
          if (channel.slug && (channel.slug==="jerry-springer-parent" || channel._id==="590b1a504eb8b4f6582d90cb")) {
            parentChannels.push(channel);
          }
        });
      }
      grid.channels = parentChannels;
      break;

    case types.RECEIVE_SEARCH_CHANNELS_ERROR:
      grid.channels = [];
      grid.channelsError = action.error;
      break;

    case types.RECEIVE_SEARCH_VIDEOS_DATA:
      grid.videos = action.result.videos;
      break;

    case types.RECEIVE_SEARCH_VIDEOS_ERROR:
      grid.videos = [];
      grid.videosError = action.error;
      break;
    /* End listeners for search grid page */


    /* Resets */
    case types.REQUEST_SEARCH_RESET_DATA:
      return {
        ...state,
        reset: true
      };
    case types.RECEIVE_SEARCH_RESET_DATA:
      return {
        ...initialState,
        reset: false
      };
    case types.RECEIVE_SEARCH_RESET_ERROR:
      return {
        ...state,
        reset: false
      };
    default:
      return newState;
  }

  newState.grid = grid;
  return newState;
}

export function isLoaded(globalState) {
  return globalState.apiAccess && globalState.apiAccess.token && globalState.search && globalState.search.loaded;
}

export function searchNav(token, query) {
  return {
    types: [types.REQUEST_SEARCH_NAV_DATA, types.RECEIVE_SEARCH_NAV_DATA, types.RECEIVE_SEARCH_NAV_ERROR],
    promise: (client) => client.post('/searchNav', {
      data: {
        token: token,
        query: query
      }
    })
  };
}

export function searchChannels(token, query) {
  return {
    types: [types.REQUEST_SEARCH_CHANNELS_DATA, types.RECEIVE_SEARCH_CHANNELS_DATA, types.RECEIVE_SEARCH_CHANNELS_ERROR],
    promise: (client) => client.post('/searchChannels', {
      data: {
        token: token,
        query: query
      }
    })
  };
}

export function searchVideos(token, query) {
  return {
    types: [types.REQUEST_SEARCH_VIDEOS_DATA, types.RECEIVE_SEARCH_VIDEOS_DATA, types.RECEIVE_SEARCH_VIDEOS_ERROR],
    promise: (client) => client.post('/searchVideos', {
      data: {
        token: token,
        query: query
      }
    })
  };
}

export function resetSearchGrid() {
  return {
    types: [types.REQUEST_SEARCH_RESET_DATA, types.RECEIVE_SEARCH_RESET_DATA, types.RECEIVE_SEARCH_RESET_ERROR],
    promise: (client) => client.get('/searchReset')
  };
}
