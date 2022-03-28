import axios from "axios";

const loginService = async ({ email, password }) => {
  return await axios.post("/api/auth/login", {
    email,
    password,
  });
};

export { loginService };
