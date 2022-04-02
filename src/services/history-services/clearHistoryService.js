import axios from "axios";

const clearHistoryService = token => {
  return axios.delete("/api/user/history/all", { headers: { authorization: token } });
};

export { clearHistoryService };
