import axios from "axios";

const addToHistoryService = (token, video) => {
  return axios.post("/api/user/history", { video }, { headers: { authorization: token } });
};

export { addToHistoryService };
