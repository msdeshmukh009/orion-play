import toast from "react-hot-toast";
import { useContext } from "react";
import { watchLaterContext } from "../context/watchLaterContext";
import {
  addToWatchLaterService,
  removeFromWatchLaterService,
} from "../services/watch-later-services";
import { watchLaterActions } from "../reducers/actionTypes";
import { useAuth } from "./useAuth";

const { INITIALIZE, SET_ERROR, SET_WATCH_LATER } = watchLaterActions;

const useWatchLater = () => {
  const { watchLaterState, watchLaterDispatch } = useContext(watchLaterContext);

  const {
    authState: {
      userDetails: { token },
    },
  } = useAuth();

  const addToWatchLater = async video => {
    try {
      watchLaterDispatch({ type: INITIALIZE });

      const { status, data } = await addToWatchLaterService(token, video);

      if (status === 201) {
        watchLaterDispatch({ type: SET_WATCH_LATER, payload: data.watchlater });
        toast.success("Video added to watch later", { position: "bottom-center" });
      }
    } catch (err) {
      watchLaterDispatch({ type: SET_ERROR, payload: err.response.data.error[0] });
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
      watchLaterDispatch({ type: SET_ERROR, payload: err.response.data.error[0] });
    }
  };

  return { watchLaterState, addToWatchLater, removeFromWatchLater };
};

export { useWatchLater };
