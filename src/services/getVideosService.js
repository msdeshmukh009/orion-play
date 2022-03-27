import axios from "axios";

const getVideos = async () => {
  return await axios.get("/api/videos");
};

export { getVideos };
