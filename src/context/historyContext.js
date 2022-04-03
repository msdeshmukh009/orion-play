import { createContext, useContext, useReducer, useEffect } from "react";
import { historyReducer } from "../reducers";
import {
  getHistoryService,
  addToHistoryService,
  removeFromHistoryService,
  clearHistoryService,
} from "../services";
import { useAuth } from "../hooks";
import { historyActions } from "../reducers/actionTypes";
import toast from "react-hot-toast";

const { INITIALIZE, SET_ERROR, SET_HISTORY } = historyActions;

export const historyContext = createContext();

const useWatchHistory = () => useContext(historyContext);

const HistoryProvider = ({ children }) => {
  const [historyState, historyDispatch] = useReducer(historyReducer, {
    loading: false,
    history: [],
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
            historyDispatch({ type: INITIALIZE });

            const { status, data } = await getHistoryService(token);

            if (status === 200) {
              historyDispatch({ type: "SET_HISTORY", payload: data.history });
            }
          } catch (err) {
            historyDispatch({ type: SET_ERROR, payload: err.response.data.errors[0] });
          }
        })()
      : historyDispatch({ type: "SET_HISTORY", payload: [] });
  }, [token]);

  const addToHistory = async video => {
    try {
      historyDispatch({ type: INITIALIZE });

      const { status, data } = await addToHistoryService(token, video);

      if (status === 201) {
        historyDispatch({ type: SET_HISTORY, payload: data.history });
      }
    } catch (err) {
      historyDispatch({ type: SET_ERROR, payload: err.response.data.errors[0] });
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
      historyDispatch({ type: SET_ERROR, payload: err.response.data.errors[0] });
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
      historyDispatch({ type: SET_ERROR, payload: err.response.data.errors[0] });
    }
  };

  return (
    <historyContext.Provider
      value={{ historyState, historyDispatch, addToHistory, removeFromHistory, clearHistory }}
    >
      {children}
    </historyContext.Provider>
  );
};

export { useWatchHistory, HistoryProvider };
