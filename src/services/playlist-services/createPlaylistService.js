import axios from "axios";

const createPlaylistService = (token, playlist) => {
  return axios.post("/api/user/playlists", { ...playlist }, { headers: { authorization: token } });
};

export { createPlaylistService };
