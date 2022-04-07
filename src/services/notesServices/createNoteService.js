import axios from "axios";

const createNoteService = (token, note) => {
  return axios.post("/api/user/notes", { note }, { headers: { authorization: token } });
};

export { createNoteService };
