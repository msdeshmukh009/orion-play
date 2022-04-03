import { createContext, useEffect, useReducer } from "react";
import { watchLaterReducer } from "../reducers";
import { watchLaterActions } from "../reducers/actionTypes";
import { useAuth } from "../hooks";
import { getWatchLaterService } from "../services";

const { INITIALIZE, SET_ERROR, SET_WATCH_LATER } = watchLaterActions;

const watchLaterContext = createContext();

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

  return (
    <watchLaterContext.Provider value={{ watchLaterState, watchLaterDispatch }}>
      {children}
    </watchLaterContext.Provider>
  );
};

export { watchLaterContext, WatchLaterVideosProvider };
