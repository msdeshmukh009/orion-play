import { likesActions } from "./actionTypes";

const { INITIALIZE, SET_ERROR, SET_LIKEDLIST } = likesActions;

const likesReducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      return { ...state, loading: true, error: "" };

    case SET_LIKEDLIST:
      return { ...state, likedList: action.payload, loading: false };

    case SET_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
export { likesReducer };
