import { createContext, useContext, useReducer, useEffect } from "react";
import { videosReducer } from "../reducers/videosReducer";
import { videosActions } from "../reducers/actionTypes";
import { getVideos } from "../services";

const { INITIALIZE, SET_VIDEOS, SET_ERROR } = videosActions;

const videosContext = createContext();

const useVideos = () => useContext(videosContext);

const VideosProvider = ({ children }) => {
  const [videoState, videoDispatch] = useReducer(videosReducer, {
    loading: false,
    videos: [],
    error: "",
  });

  useEffect(() => {
    (async () => {
      try {
        videoDispatch({ type: INITIALIZE });

        const res = await getVideos();
        if (res.status === 200) {
          videoDispatch({ type: SET_VIDEOS, payload: res.data.videos });
        }
      } catch (err) {
        videoDispatch({ type: SET_ERROR, payload: err.message });
      }
    })();
  }, []);

  return (
    <videosContext.Provider value={{ videoState, videoDispatch }}>
      {children}
    </videosContext.Provider>
  );
};

export { useVideos, VideosProvider };
