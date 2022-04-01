import axios from "axios";

const removeFromHistoryService = (token, videoId) => {
  return axios.delete(`/api/user/history/${videoId}`, { headers: { authorization: token } });
};

export { removeFromHistoryService };
