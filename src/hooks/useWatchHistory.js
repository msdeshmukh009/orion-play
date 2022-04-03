import { useContext } from "react";
import { historyContext } from "../context/historyContext";
import { addToHistoryService, removeFromHistoryService, clearHistoryService } from "../services";
import { historyActions } from "../reducers/actionTypes";
import { useAuth } from "./useAuth";
import toast from "react-hot-toast";

const { INITIALIZE, SET_ERROR, SET_HISTORY } = historyActions;

const useWatchHistory = () => {
  const { historyState, historyDispatch } = useContext(historyContext);
  const {
    authState: {
      userDetails: { token },
    },
  } = useAuth();

  const addToHistory = async video => {
    try {
      historyDispatch({ type: INITIALIZE });

      const { status, data, config } = await addToHistoryService(token, video);

      if (status === 201) {
        historyDispatch({ type: SET_HISTORY, payload: data.history });
      }
    } catch (err) {
      historyDispatch({ type: SET_ERROR, payload: err.response.data.error[0] });
    }
  };

  const removeFromHistory = async videoId => {
    try {
      historyDispatch({ type: INITIALIZE });

      const { status, data } = await removeFromHistoryService(token, videoId);

      if (status === 200) {
        historyDispatch({ type: SET_HISTORY, payload: data.history });
        toast.success("Video removed from history");
      }
    } catch (err) {
      historyDispatch({ type: SET_ERROR, payload: err.response.data.error[0] });
    }
  };

  const clearHistory = async () => {
    try {
      historyDispatch({ type: INITIALIZE });

      const { status, data } = await clearHistoryService(token);

      if (status === 200) {
        historyDispatch({ type: SET_HISTORY, payload: data.history });
        toast.success("History cleared");
      }
    } catch (err) {
      historyDispatch({ type: SET_ERROR, payload: err.response.data.error[0] });
    }
  };

  return { historyState, addToHistory, removeFromHistory, clearHistory };
};

export { useWatchHistory };
