import axios from "axios";

const removeLikesService = async (id, token) => {
  return await axios.delete(`/api/user/likes/${id}`, {
    headers: { authorization: token },
  });
};

export { removeLikesService };
