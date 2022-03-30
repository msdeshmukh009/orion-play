import axios from "axios";

const addToPlaylistService = (token, playlistId, video) => {
  return axios.post(
    `/api/user/playlists/${playlistId}`,
    { video },
    { headers: { authorization: token } }
  );
};

export { addToPlaylistService };
