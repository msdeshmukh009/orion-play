import { createContext, useReducer, useEffect, useState } from "react";
import { playlistReducer } from "../reducers";
import { useAuth } from "../hooks";
import { playlistActions } from "../reducers/actionTypes";
import { getPlaylistsService } from "../services";

const { INITIALIZE, SET_PLAYLIST, SET_ERROR } = playlistActions;

const playlistContext = createContext();

const PlaylistProvider = ({ children }) => {
  const [playlistState, playlistDispatch] = useReducer(playlistReducer, {
    playlists: [],
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
            playlistDispatch({ type: INITIALIZE });

            const res = await getPlaylistsService(token);

            if (res.status === 200) {
              playlistDispatch({ type: SET_PLAYLIST, payload: res.data.playlists });
            }
          } catch (err) {
            playlistDispatch({ type: SET_ERROR, payload: err.response.data.errors[0] });
          }
        })()
      : playlistDispatch({ type: SET_PLAYLIST, payload: [] });
  }, [token]);

  return (
    <playlistContext.Provider
      value={{
        playlistState,
        playlistDispatch,
      }}
    >
      {children}
    </playlistContext.Provider>
  );
};

export { PlaylistProvider, playlistContext };
