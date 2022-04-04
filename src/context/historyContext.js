import { createContext, useReducer, useEffect } from "react";
import { historyReducer } from "../reducers";
import { getHistoryService } from "../services";
import { useAuth } from "../hooks";
import { historyActions } from "../reducers/actionTypes";

const { INITIALIZE, SET_ERROR, SET_HISTORY } = historyActions;

const historyContext = createContext();

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
              historyDispatch({ type: SET_HISTORY, payload: data.history });
            }
          } catch (err) {
            historyDispatch({ type: SET_ERROR, payload: err.response.data.errors[0] });
          }
        })()
      : historyDispatch({ type: SET_HISTORY, payload: [] });
  }, [token]);

  return (
    <historyContext.Provider value={{ historyState, historyDispatch }}>
      {children}
    </historyContext.Provider>
  );
};

export { historyContext, HistoryProvider };
