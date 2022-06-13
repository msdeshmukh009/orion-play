import axios from "axios";

function getPagedVideosService(pageNum) {
  return axios.get(`/api/videos/page/${pageNum}`);
}
export { getPagedVideosService };
