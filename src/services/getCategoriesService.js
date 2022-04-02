import axios from "axios";

const getCategoriesService = () => {
  return axios.get("/api/categories");
};

export { getCategoriesService };
