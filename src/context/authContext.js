import { createContext, useReducer } from "react";
import { authReducer } from "../reducers";

const authContext = createContext();

const initialState = {
  userDetails: {
    userName: JSON.parse(localStorage.getItem("jwt"))?.userName || "",
    token: JSON.parse(localStorage.getItem("jwt"))?.token || "",
  },
  loading: false,
  error: "",
};

const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, initialState);

  return (
    <authContext.Provider value={{ authState, authDispatch }}>{children}</authContext.Provider>
  );
};

export { authContext, AuthProvider };
