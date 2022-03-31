import { createContext, useEffect, useReducer, useContext } from "react";
import { watchLaterReducer } from "../reducers";
import { watchLaterActions } from "../reducers/actionTypes";
import { useAuth } from "./authContext";
import {
  getWatchLaterService,
  addToWatchLaterService,
  removeFromWatchLaterService,
} from "../services";
import toast from "react-hot-toast";

const { INITIALIZE, SET_ERROR, SET_WATCH_LATER } = watchLaterActions;

const watchLaterContext = createContext();

const useWatchLaterVideos = () => useContext(watchLaterContext);

const WatchLaterVideosProvider = ({ children }) => {
  const [watchLaterState, watchLaterDispatch] = useReducer(watchLaterReducer, {
    loading: false,
    watchLaterVideos: [],
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
            watchLaterDispatch({ type: INITIALIZE });

            const { status, data } = await getWatchLaterService(token);

            if (status === 200) {
              watchLaterDispatch({ type: SET_WATCH_LATER, payload: data.watchlater });
            }
          } catch (err) {
            console.log(err.response.data.errors[0]);
            watchLaterDispatch({ type: SET_ERROR, payload: err.response.data.errors[0] });
          }
        })()
      : watchLaterDispatch({ type: SET_WATCH_LATER, payload: [] });
  }, [token]);

  const addToWatchLater = async video => {
    try {
      watchLaterDispatch({ type: INITIALIZE });

      const { status, data } = await addToWatchLaterService(token, video);

      if (status === 201) {
        watchLaterDispatch({ type: SET_WATCH_LATER, payload: data.watchlater });
        toast.success("Video added to watch later", { position: "bottom-center" });
      }
    } catch (err) {
      watchLaterDispatch({ type: SET_ERROR, payload: err.response.data.errors[0] });
    }
  };

  const removeFromWatchLater = async videoId => {
    try {
      watchLaterDispatch({ type: INITIALIZE });

      const { status, data } = await removeFromWatchLaterService(token, videoId);

      if (status === 200) {
        watchLaterDispatch({ type: SET_WATCH_LATER, payload: data.watchlater });
        toast.success("Video removed from watch later", { position: "bottom-center" });
      }
    } catch (err) {
      watchLaterDispatch({ type: SET_ERROR, payload: err.response.data.errors[0] });
    }
  };

  return (
    <watchLaterContext.Provider
      value={{ watchLaterState, watchLaterDispatch, addToWatchLater, removeFromWatchLater }}
    >
      {children}
    </watchLaterContext.Provider>
  );
};

export { useWatchLaterVideos, WatchLaterVideosProvider };
