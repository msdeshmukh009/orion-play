import { historyActions } from "./actionTypes";

const { INITIALIZE, SET_ERROR, SET_HISTORY } = historyActions;

const historyReducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      return { ...state, loading: true, error: "" };

    case SET_HISTORY:
      return { ...state, loading: false, history: action.payload };

    case SET_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
export { historyReducer };
