import { useContext } from "react";
import toast from "react-hot-toast";
import { useAuth } from "./useAuth";
import { playlistContext } from "../context/playlistContext";
import { playlistActions } from "../reducers/actionTypes";
import {
  addToPlaylistService,
  removeFromPlaylistService,
  removePlaylistService,
  createPlaylistService,
} from "../services/playlist-services";

const { INITIALIZE, SET_ERROR, SET_PLAYLIST, UPDATE_PLAYLIST } = playlistActions;

const usePlaylist = () => {
  const { playlistState, playlistDispatch } = useContext(playlistContext);
  const {
    authState: {
      userDetails: { token },
    },
  } = useAuth();

  const addVideoToPlaylist = async (video, playlistId) => {
    try {
      playlistDispatch({ type: INITIALIZE });

      const res = await addToPlaylistService(token, playlistId, video);

      if (res.status === 201) {
        playlistDispatch({ type: UPDATE_PLAYLIST, payload: res.data.playlist });
        toast.success("Video added to playlist");
      }
    } catch (err) {
      playlistDispatch({ type: SET_ERROR, payload: err.response.data.error[0] });
      toast.error(err.response.data.error[0]);
    }
  };

  const removeFromPlaylist = async (playlistId, videoId) => {
    try {
      playlistDispatch({ type: INITIALIZE });

      const res = await removeFromPlaylistService(token, playlistId, videoId);

      if (res.status === 200) {
        playlistDispatch({ type: UPDATE_PLAYLIST, payload: res.data.playlist });
        toast.success("Video removed from playlist");
      }
    } catch (err) {
      playlistDispatch({ type: SET_ERROR, payload: err.response.data.error[0] });
      toast.error(err.response.data.error[0]);
    }
  };

  const createPlaylist = async (playlistName, video) => {
    try {
      playlistDispatch({ type: INITIALIZE });

      const res = await createPlaylistService(token, { playlist: { title: playlistName } });

      if (res.status === 201) {
        playlistDispatch({ type: SET_PLAYLIST, payload: res.data.playlists });
        const newPlaylistId = res.data.playlists.slice(-1)[0]._id;
        video ? await addVideoToPlaylist(video, newPlaylistId) : toast.success("Playlist Created");
      }
    } catch (err) {
      playlistDispatch({ type: SET_ERROR, payload: err.response.data.error[0] });
      toast.error(err.response.data.error[0]);
    }
  };

  const deletePlaylist = async playlistId => {
    try {
      const res = await removePlaylistService(token, playlistId);
      if (res.status === 200) {
        playlistDispatch({ type: SET_PLAYLIST, payload: res.data.playlists });
        toast.success("Playlist deleted");
      }
    } catch (err) {
      playlistDispatch({ type: SET_ERROR, payload: err.response.data.error[0] });
      toast.error(err.response.data.error[0]);
    }
  };

  return { playlistState, createPlaylist, removeFromPlaylist, addVideoToPlaylist, deletePlaylist };
};

export { usePlaylist };
