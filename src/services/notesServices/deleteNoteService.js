import axios from "axios";

const deleteNoteService = (token, noteId) => {
  return axios.delete(`/api/user/notes/${noteId}`, { headers: { authorization: token } });
};

export { deleteNoteService };
