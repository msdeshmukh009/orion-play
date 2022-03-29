import { authActions } from "./actionTypes";

const { INITIALIZE, LOGIN_USER, LOGOUT_USER, SET_ERROR } = authActions;

const authReducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      return { ...state, loading: true, error: "" };

    case LOGIN_USER:
      return {
        ...state,
        userDetails: {
          userName: action.payload.userName,
          token: action.payload.token,
        },
        loading: false,
      };
    case LOGOUT_USER:
      return {
        ...state,
        userDetails: {
          userName: "",
          token: "",
        },
      };
    case SET_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
export { authReducer };
