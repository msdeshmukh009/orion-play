import { videosActions } from "./actionTypes";

const {
  SET_VIDEOS,
  SET_ERROR,
  INITIALIZE,
  SET_CATEGORY,
  APPLY_SEARCH_TERM,
  INCREMENT_PAGE_NUMBER,
  SET_HAS_MORE,
} = videosActions;

const videosReducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      return { ...state, loading: true, error: "" };

    case SET_VIDEOS:
      return {
        ...state,
        loading: false,
        videos: [...state.videos, ...action.payload],
        hasMore: action.payload.length > 0,
      };

    case SET_ERROR:
      return { ...state, loading: false, error: action.payload };

    case SET_CATEGORY:
      return { ...state, selectedCategory: action.payload };

    case APPLY_SEARCH_TERM:
      return { ...state, appliedSearchTerm: action.payload };

    case INCREMENT_PAGE_NUMBER:
      return { ...state, pageNumber: state.pageNumber + 1 };

    case SET_HAS_MORE:
      return { ...state, hasMore: action.payload };

    default:
      return state;
  }
};
export { videosReducer };
