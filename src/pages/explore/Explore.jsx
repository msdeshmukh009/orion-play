import { Loading, VideoCard } from "../../components";
import { useVideos } from "../../context/videosContext";
import "./explore.css";

const Explore = () => {
  const {
    videoState: { videos, loading, error },
  } = useVideos();

  return (
    <>
      {loading && <Loading />}
      {error && <span>{error}</span>}

      <main className="video-listing-grid">
        {videos?.map(video => (
          <VideoCard key={video._id} video={video} />
        ))}
      </main>
    </>
  );
};

export { Explore };
