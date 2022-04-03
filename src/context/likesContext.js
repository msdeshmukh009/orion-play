import { createContext, useReducer, useEffect } from "react";
import { likesReducer } from "../reducers";
import { getLikesService } from "../services";
import { useAuth } from "../hooks";
import { likesActions } from "../reducers/actionTypes";

const { INITIALIZE, SET_ERROR, SET_LIKEDLIST } = likesActions;

const likesContext = createContext();

const LikesProvider = ({ children }) => {
  const [likesState, likesDispatch] = useReducer(likesReducer, {
    likedList: [],
    loading: false,
    error: "",
  });

  const {
    authState: {
      userDetails: { token },
    },
  } = useAuth();

  useEffect(() => {
    token
      ? (async () => {
          try {
            likesDispatch({ type: INITIALIZE });

            const res = await getLikesService(token);

            if (res.status === 200) {
              likesDispatch({ type: SET_LIKEDLIST, payload: res.data.likes });
            }
          } catch (err) {
            likesDispatch({ type: SET_ERROR, payload: err.response.data.error[0] });
          }
        })()
      : likesDispatch({ type: SET_LIKEDLIST, payload: [] });
  }, [token]);

  return (
    <likesContext.Provider value={{ likesState, likesDispatch }}>{children}</likesContext.Provider>
  );
};

export { likesContext, LikesProvider };
