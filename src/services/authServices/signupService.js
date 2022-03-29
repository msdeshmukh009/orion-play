import axios from "axios";

const signupService = async ({ email, password, firstName, lastName }) => {
  return await axios.post("/api/auth/signup", {
    email,
    password,
    firstName,
    lastName,
  });
};
export { signupService };
