import { createContext, useContext, useReducer, useEffect } from "react";
import { videosReducer } from "../reducers/videosReducer";
import { videosActions } from "../reducers/actionTypes";
import { getVideos } from "../services";
import { filterVideoList } from "../utils";

const { INITIALIZE, SET_VIDEOS, SET_ERROR } = videosActions;

const videosContext = createContext();

const useVideos = () => useContext(videosContext);

const VideosProvider = ({ children }) => {
  const [videoState, videoDispatch] = useReducer(videosReducer, {
    loading: false,
    videos: [],
    error: "",
    selectedCategory: "all",
    appliedSearchTerm: "",
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
  const filteredList = filterVideoList(videoState.selectedCategory, videoState.videos);

  const finalVideoList =
    videoState.appliedSearchTerm === ""
      ? filteredList
      : filteredList.filter(video =>
          video.title.toLowerCase().includes(videoState.appliedSearchTerm.toLowerCase())
        );

  return (
    <videosContext.Provider value={{ videoState, videoDispatch, finalVideoList }}>
      {children}
    </videosContext.Provider>
  );
};

export { useVideos, VideosProvider };
