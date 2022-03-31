import axios from "axios";

const removeFromPlaylistService = (token, playlistId, videoId) => {
  return axios.delete(`/api/user/playlists/${playlistId}/${videoId}`, {
    headers: { authorization: token },
  });
};
export { removeFromPlaylistService };
