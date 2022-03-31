import axios from "axios";

const getWatchLaterService = token => {
  return axios.get("/api/user/watchlater", { headers: { authorization: token } });
};

export { getWatchLaterService };
