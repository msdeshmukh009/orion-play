import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const defaultNote = { title: "", noteBody: "" };

const NoteEditor = ({
  note = defaultNote,
  createNote,
  videoId,
  isEditing,
  setIsEditing,
  editNote,
  token,
}) => {
  const [noteDetails, setNoteDetails] = useState(note);
  const navigate = useNavigate();
  const createNewNoteHandler = () => {
    if (token) {
      if (noteDetails.title.trim().length && noteDetails.noteBody.trim().length) {
        createNote({ videoId, ...noteDetails });
      }
    } else {
      navigate("/signin");
      toast.error("Please login to continue", { duration: 1000 });
    }
    setNoteDetails(defaultNote);
  };

  const editNoteHandler = () => {
    if (noteDetails.title.trim().length && noteDetails.noteBody.trim().length) {
      editNote(noteDetails._id, noteDetails);
    }
    setIsEditing(false);
  };

  const submitButtonHandler = () => {
    isEditing ? editNoteHandler() : createNewNoteHandler();
  };

  const discardButtonHandler = () => {
    isEditing ? setIsEditing(false) : setNoteDetails(defaultNote);
  };

  return (
    <form className="notes-form" onSubmit={e => e.preventDefault()}>
      <div className="input-grp">
        <input
          className="form-field"
          type="text"
          placeholder="Title"
          value={noteDetails.title}
          onChange={e => setNoteDetails({ ...noteDetails, title: e.target.value })}
        />
      </div>
      <div className="input-grp">
        <textarea
          className="form-field"
          cols="10"
          rows="5"
          placeholder="Note..."
          value={noteDetails.noteBody}
          onChange={e => setNoteDetails({ ...noteDetails, noteBody: e.target.value })}
        ></textarea>
      </div>
      <div className="flex-total-center form-cta">
        <button className="btn btn-primary" onClick={submitButtonHandler}>
          {isEditing ? "Update note" : "Save note"}
        </button>
        <button className="btn btn-secondary" onClick={discardButtonHandler}>
          Discard
        </button>
      </div>
    </form>
  );
};

export { NoteEditor };
