import axios from "axios";

const getPlaylistsService = token => {
  return axios.get("/api/user/playlists", {
    headers: { authorization: token },
  });
};

export { getPlaylistsService };
