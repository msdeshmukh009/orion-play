const videosActions = {
  SET_VIDEOS: "SET_VIDEOS",
  INITIALIZE: "INITIALIZE",
  SET_ERROR: "SET_ERROR",
  SET_CATEGORY: "SET_CATEGORY",
  APPLY_SEARCH_TERM: "APPLY_SEARCH_TERM",
  INCREMENT_PAGE_NUMBER: "INCREMENT_PAGE_NUMBER",
  SET_HAS_MORE: "SET_HAS_MORE",
};

const authActions = {
  INITIALIZE: "INITIALIZE",
  LOGIN_USER: "LOGIN_USER",
  LOGOUT_USER: "LOGOUT_USER",
  SET_ERROR: "SET_ERROR",
};

const likesActions = {
  INITIALIZE: "INITIALIZE",
  SET_ERROR: "SET_ERROR",
  SET_LIKEDLIST: "SET_LIKEDLIST",
};

const playlistActions = {
  INITIALIZE: "INITIALIZE",
  SET_PLAYLIST: "SET_PLAYLIST",
  SET_ERROR: "SET_ERROR",
  UPDATE_PLAYLIST: "UPDATE_PLAYLIST",
};
const watchLaterActions = {
  INITIALIZE: "INITIALIZE",
  SET_WATCH_LATER: "SET_WATCH_LATER",
  SET_ERROR: "SET_ERROR",
};
const historyActions = {
  INITIALIZE: "INITIALIZE",
  SET_HISTORY: "SET_WATCH_LATER",
  SET_ERROR: "SET_ERROR",
};
export {
  videosActions,
  authActions,
  likesActions,
  playlistActions,
  watchLaterActions,
  historyActions,
};
