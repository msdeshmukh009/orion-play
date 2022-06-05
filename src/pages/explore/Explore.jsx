import { useRef, useEffect, useState } from "react";
import { Loading, VideoCard } from "../../components";
import { useCategory, useVideos } from "../../context";
import { videosActions } from "../../reducers/actionTypes";
import "./explore.css";

const Explore = () => {
  const { SET_CATEGORY, INCREMENT_PAGE_NUMBER } = videosActions;
  const [lastVideo, setLastVideo] = useState(null);
  const {
    videoState: { loading, selectedCategory, hasMore },
    videoDispatch,
    finalVideoList,
  } = useVideos();

  const {
    categoryState: { categories },
  } = useCategory();

  useEffect(() => {
    const currentObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore) {
          videoDispatch({ type: INCREMENT_PAGE_NUMBER });
        }
      },
      { threshold: 1 }
    );

    if (lastVideo) {
      currentObserver.observe(lastVideo);
    }
    return () => {
      if (lastVideo) {
        currentObserver.disconnect();
      }
    };
  }, [lastVideo]);

  return (
    <>
      <div className="explore-category-section">
        <button
          className={`btn btn-outline-primary chip-btn ${
            selectedCategory === "all" ? "chip-btn-active" : ""
          }`}
          onClick={() => videoDispatch({ type: SET_CATEGORY, payload: "all" })}
        >
          All
        </button>
        {categories.map(({ _id, categoryName }) => (
          <button
            key={_id}
            className={`btn btn-outline-primary chip-btn ${
              selectedCategory === categoryName ? "chip-btn-active" : ""
            }`}
            onClick={() => videoDispatch({ type: SET_CATEGORY, payload: categoryName })}
          >
            {categoryName}
          </button>
        ))}
      </div>

      {finalVideoList.length ? (
        <main className="video-listing-grid">
          {finalVideoList?.map((video, index) => {
            return index === finalVideoList.length - 1 && !loading ? (
              <div ref={setLastVideo} key={video._id}>
                <VideoCard video={video} />
              </div>
            ) : (
              <VideoCard video={video} key={video._id} />
            );
          })}
        </main>
      ) : (
        !loading && <div className="text-center">No results found...</div>
      )}
      {loading && <Loading />}
    </>
  );
};

export { Explore };
