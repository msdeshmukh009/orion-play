import axios from "axios";

const getLikesService = async token => {
  return await axios.get("/api/user/likes", {
    headers: { authorization: token },
  });
};

export { getLikesService };
