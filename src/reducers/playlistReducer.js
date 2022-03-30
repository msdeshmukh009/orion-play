import { playlistActions } from "./actionTypes";
const { INITIALIZE, SET_PLAYLIST, SET_ERROR, UPDATE_PLAYLIST } = playlistActions;

const playlistReducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      return { ...state, loading: true, error: "" };

    case SET_PLAYLIST:
      return { ...state, playlists: action.payload, loading: false };

    case SET_ERROR:
      return { ...state, loading: false, error: action.payload };

    case UPDATE_PLAYLIST:
      return {
        ...state,
        playlists: state.playlists.map(list =>
          list._id === action.payload._id ? action.payload : list
        ),
        loading: false,
      };

    default:
      return state;
  }
};

export { playlistReducer };
