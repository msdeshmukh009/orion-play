import { watchLaterActions } from "./actionTypes";

const { INITIALIZE, SET_ERROR, SET_WATCH_LATER } = watchLaterActions;

const watchLaterReducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      return { ...state, loading: true, error: false };
    case SET_WATCH_LATER:
      return { ...state, loading: false, watchLaterVideos: action.payload };
    case SET_ERROR:
      return { ...state, loading: false, error: action.payload };
  }
};
export { watchLaterReducer };
