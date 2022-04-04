import axios from "axios";

const getNotesForVideoService = (token, videoId) => {
  return axios.get(`/api/user/notes/${videoId}`, { headers: { authorization: token } });
};
export { getNotesForVideoService };
