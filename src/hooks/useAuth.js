import { useContext } from "react";
import toast from "react-hot-toast";
import { authContext } from "../context/authContext";
import { loginService, signupService } from "../services";
import { authActions } from "../reducers/actionTypes";
import { useNavigate } from "react-router-dom";

const { SET_ERROR, INITIALIZE, LOGIN_USER, LOGOUT_USER } = authActions;

const useAuth = () => {
  const { authState, authDispatch } = useContext(authContext);
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
      authDispatch({ type: SET_ERROR, payload: err.response.data.errors[0] });
    }
  };

  const signup = async userInput => {
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
      authDispatch({ type: SET_ERROR, payload: err.response.data.errors[0] });
    }
  };

  const logout = () => {
    authDispatch({ type: LOGOUT_USER });
    navigate("/");
    localStorage.removeItem("jwt");
  };

  return { authState, login, signup, logout };
};

export { useAuth };
