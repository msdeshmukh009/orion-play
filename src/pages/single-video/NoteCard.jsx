import { useState } from "react";
import { NoteEditor } from "./NoteEditor";

const NoteCard = ({ note, deleteNote, editNote }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { _id, title, noteBody } = note;

  return (
    <div className="notes-card flex-column">
      <div className="card text-card">
        {isEditing ? (
          <NoteEditor
            note={note}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            editNote={editNote}
          />
        ) : (
          <>
            <h3>{title}</h3>
            <p>{noteBody}</p>
            <div className="card-cta-vertical">
              <button
                className="btn btn-outline text-primary-color"
                onClick={() => setIsEditing(true)}
              >
                <i className="far fa-edit"></i>
              </button>
              <button
                className="btn btn-outline text-primary-color"
                onClick={() => deleteNote(_id)}
              >
                <i className="far fa-trash"></i>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export { NoteCard };
