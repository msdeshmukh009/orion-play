import axios from "axios";

const addToWatchLaterService = (token, video) => {
  return axios.post("/api/user/watchlater", { video }, { headers: { authorization: token } });
};

export { addToWatchLaterService };
