import { videosActions } from "./actionTypes";

const { SET_VIDEOS, SET_ERROR, INITIALIZE, SET_CATEGORY } = videosActions;

const videosReducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      return { ...state, loading: true, error: "" };

    case SET_VIDEOS:
      return { ...state, loading: false, videos: action.payload };

    case SET_ERROR:
      return { ...state, loading: false, error: action.payload };

    case SET_CATEGORY:
      return { ...state, selectedCategory: action.payload };

    case "APPLY_SEARCH_TERM":
      return { ...state, appliedSearchTerm: action.payload };
    default:
      return state;
  }
};
export { videosReducer };
