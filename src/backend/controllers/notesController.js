import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";
import { v4 as uuid } from "uuid";
/**
 * All the routes related to Notes are present here.
 *  These are Privately accessible routes.
 * */

/**
 * This handler handles gets all notes in the db associated with particular video.
 * send GET Request at /api/user/notes/:videoId
 * */

export const getNotesForVideo = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (user) {
    const videoId = request.params.videoId;
    const videoNotes = user.notes.filter(item => item.videoId === videoId);

    return new Response(200, {}, { notes: videoNotes });
  }
  return new Response(
    404,
    {},
    { errors: ["The user you request does not exist. Not Found error."] }
  );
};

/**
 * This handler handles creating a new note
 * send POST Request at /api/user/notes
 * body contains {note}
 * */

export const createNoteHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const { note } = JSON.parse(request.requestBody);

    user.notes.push({ ...note, _id: uuid() });
    this.db.users.update({ _id: user._id }, user);
    return new Response(201, {}, { notes: user.notes });
  } catch (error) {
    console.log(error);
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};
/**
 * This handler handles deleting a note
 * send DELETE Request at /api/user/notes/:noteId
 * */

export const deleteNoteHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const noteId = request.params.noteId;
    const filteredNotes = user.notes.filter(item => item._id !== noteId);
    this.db.users.update({ notes: filteredNotes });

    return new Response(200, {}, { notes: filteredNotes });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};
/**
 * This handler handles updating a note
 * send POST Request at /api/user/notes/:noteId
 * body contains {note}
 * */

export const updateNoteHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const { note } = JSON.parse(request.requestBody);

    const { noteId } = request.params;

    const noteIndex = user.notes.findIndex(note => note._id === noteId);
    user.notes[noteIndex] = { ...user.notes[noteIndex], ...note };

    return new Response(201, {}, { notes: user.notes });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};
