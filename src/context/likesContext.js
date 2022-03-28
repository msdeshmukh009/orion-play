import { createContext, useContext, useReducer, useEffect } from "react";
import { likesReducer } from "../reducers";
import { getLikesService, removeLikesService, addToLikesService } from "../services";
import { useAuth } from "./authContext";
import { likesActions } from "../reducers/actionTypes";
import toast from "react-hot-toast";

const { INITIALIZE, SET_ERROR, SET_LIKEDLIST } = likesActions;

const likesContext = createContext();

const useLikes = () => useContext(likesContext);

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
            likesDispatch({ type: SET_ERROR, payload: err.response.data.errors });
          }
        })()
      : likesDispatch({ type: SET_LIKEDLIST, payload: [] });
  }, [token]);

  const addToLike = video => {
    (async () => {
      try {
        likesDispatch({ type: INITIALIZE });

        const res = await addToLikesService(video, token);

        if (res.status === 201) {
          likesDispatch({ type: SET_LIKEDLIST, payload: res.data.likes });
          toast.success("Liked", { position: "bottom-center" });
        }
      } catch (err) {
        likesDispatch({ type: SET_ERROR, payload: err.response.data.errors });
        toast.error(err.response.data.errors[0], { position: "bottom-center" });
      }
    })();
  };

  const removeFromLike = id => {
    (async () => {
      try {
        likesDispatch({ type: INITIALIZE });

        const res = await removeLikesService(id, token);

        if (res.status === 200) {
          likesDispatch({ type: SET_LIKEDLIST, payload: res.data.likes });
          toast.success("Removed from liked", { position: "bottom-center" });
        }
      } catch (err) {
        likesDispatch({ type: SET_ERROR, payload: err.response.data.errors });
        toast.error(err.response.data.errors[0], { position: "bottom-center" });
      }
    })();
  };

  return (
    <likesContext.Provider value={{ likesState, likesDispatch, addToLike, removeFromLike }}>
      {children}
    </likesContext.Provider>
  );
};

export { useLikes, LikesProvider };
