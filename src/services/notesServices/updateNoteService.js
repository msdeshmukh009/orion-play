import axios from "axios";

const updateNoteService = (token, noteId, note) => {
  return axios.post(`/api/user/notes/${noteId}`, { note }, { headers: { authorization: token } });
};

export { updateNoteService };
