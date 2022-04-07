import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  getNotesForVideoService,
  createNoteService,
  updateNoteService,
  deleteNoteService,
} from "../services";
import { useAuth } from "./useAuth";

const useNotes = videoId => {
  const [notesState, setNotesState] = useState({
    notes: [],
    loading: false,
    error: null,
  });
  const {
    authState: {
      userDetails: { token },
    },
  } = useAuth();

  useEffect(() => {
    token
      ? (async () => {
          try {
            setNotesState(prevNotes => ({
              ...prevNotes,
              loading: true,
              error: "",
            }));

            const { status, data } = await getNotesForVideoService(token, videoId);

            if (status === 200) {
              setNotesState(prevNotes => ({
                ...prevNotes,
                loading: false,
                notes: data.notes,
              }));
            }
          } catch (err) {
            setNotesState(prevNotes => ({
              ...prevNotes,
              loading: false,
              error: err.response.data.errors[0],
            }));
          }
        })()
      : setNotesState(prevNotes => ({
          ...prevNotes,
          loading: false,
          notes: [],
        }));
  }, [token]);

  const createNote = async note => {
    try {
      setNotesState(prevNotes => ({
        ...prevNotes,
        loading: true,
        error: "",
      }));

      const { status, data } = await createNoteService(token, note);

      if (status === 201) {
        setNotesState(prevNotes => ({
          ...prevNotes,
          loading: false,
          notes: data.notes.filter(note => note.videoId === videoId),
        }));
        toast.success("New note added");
      }
    } catch (err) {
      setNotesState(prevNotes => ({
        ...prevNotes,
        loading: false,
        error: err.response.data.errors[0],
      }));
    }
  };

  const editNote = async (noteId, note) => {
    try {
      setNotesState(prevNotes => ({
        ...prevNotes,
        loading: true,
        error: "",
      }));

      const { status, data } = await updateNoteService(token, noteId, note);

      if (status === 201) {
        setNotesState(prevNotes => ({
          ...prevNotes,
          loading: false,
          notes: data.notes.filter(note => note.videoId === videoId),
        }));
        toast.success("Note updated");
      }
    } catch (err) {
      setNotesState(prevNotes => ({
        ...prevNotes,
        loading: false,
        error: err.response.data.errors[0],
      }));
    }
  };
  const deleteNote = async noteId => {
    try {
      setNotesState(prevNotes => ({
        ...prevNotes,
        loading: true,
        error: "",
      }));

      const { status, data } = await deleteNoteService(token, noteId);

      if (status === 200) {
        setNotesState(prevNotes => ({
          ...prevNotes,
          loading: false,
          notes: data.notes.filter(note => note.videoId === videoId),
        }));
        toast.success("Note deleted");
      }
    } catch (err) {
      setNotesState(prevNotes => ({
        ...prevNotes,
        loading: false,
        error: err.response.data.errors[0],
      }));
    }
  };

  return {
    notesState,
    setNotesState,
    createNote,
    editNote,
    deleteNote,
  };
};
export { useNotes };
