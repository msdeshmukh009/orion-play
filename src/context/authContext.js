import { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { authReducer } from "../reducers";
import { loginService, signupService } from "../services";
import { authActions } from "../reducers/actionTypes";
import toast from "react-hot-toast";

const { INITIALIZE, LOGIN_USER, LOGOUT_USER, SET_ERROR } = authActions;

const authContext = createContext();

const useAuth = () => useContext(authContext);

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
  const navigate = useNavigate();

  const login = async (userInput, from) => {
    try {
      authDispatch({ type: INITIALIZE });

      const res = await loginService(userInput);

      if (res.status === 200) {
        const {
          foundUser: { firstName },
          encodedToken,
        } = res.data;

        localStorage.setItem("jwt", JSON.stringify({ userName: firstName, token: encodedToken }));

        authDispatch({
          type: LOGIN_USER,
          payload: { userName: firstName, token: encodedToken },
        });

        toast.success(`Hi!, ${firstName}`, { icon: "👋" });

        navigate(from, { replace: true });
      }
    } catch (err) {
      authDispatch({ type: SET_ERROR, payload: err.response.data.errors });
    }
  };

  const signup = async userInput => {
    console.log(userInput);
    try {
      authDispatch({ type: INITIALIZE });

      const res = await signupService(userInput);

      if (res.status === 201) {
        const {
          createdUser: { firstName },
          encodedToken,
        } = res.data;

        localStorage.setItem("jwt", JSON.stringify({ userName: firstName, token: encodedToken }));

        authDispatch({
          type: LOGIN_USER,
          payload: { userName: firstName, token: encodedToken },
        });

        toast.success(`Hi!, ${firstName}`, { icon: "👋" });

        navigate("/");
      }
    } catch (err) {
      authDispatch({ type: SET_ERROR, payload: err.response.data.errors });
    }
  };

  const logout = () => {
    authDispatch({ type: LOGOUT_USER });
    navigate("/");
    localStorage.removeItem("jwt");
  };
  return (
    <authContext.Provider value={{ authState, authDispatch, login, signup, logout }}>
      {children}
    </authContext.Provider>
  );
};

export { useAuth, AuthProvider };
