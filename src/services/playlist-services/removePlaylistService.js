import axios from "axios";

const removePlaylistService = (token, playlistId) => {
  return axios.delete(`/api/user/playlists/${playlistId}`, {
    headers: { authorization: token },
  });
};

export { removePlaylistService };
