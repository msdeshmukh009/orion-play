import axios from "axios";

const removeFromWatchLaterService = (token, videoId) => {
  return axios.delete(`/api/user/watchlater/${videoId}`, { headers: { authorization: token } });
};

export { removeFromWatchLaterService };
