import axios from "axios";

const getHistoryService = token => {
  return axios.get("/api/user/history", { headers: { authorization: token } });
};

export { getHistoryService };
