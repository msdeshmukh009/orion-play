import { useWatchLaterVideos } from "../../context";
import { Link } from "react-router-dom";
import { StackedVideoItem } from "../../components";
import "../single-playlist/singlePlaylist.css";
import { thumbnailLink } from "../../utils";

const WatchLater = () => {
  const {
    watchLaterState: { watchLaterVideos },
    removeFromWatchLater,
  } = useWatchLaterVideos();
  console.log(watchLaterVideos);

  return watchLaterVideos?.length ? (
    <main className="playlist-container">
      <section className="playlist-description">
        <div className="playlist-img-container">
          <img
            className="responsive-img"
            src={thumbnailLink(watchLaterVideos[0]?._id)}
            alt="playlist-name"
          />
        </div>
        <div className="playlist-text-description flex-column">
          <span className="text-semibold">Watch later</span>
          <span>{watchLaterVideos?.length} videos</span>
        </div>
      </section>
      <section className="playlist-video-items flex-column">
        {watchLaterVideos?.map(video => (
          <StackedVideoItem key={video._id} video={video} removeFunction={removeFromWatchLater} />
        ))}
      </section>
    </main>
  ) : (
    <main className="flex-total-center flex-column playlist-container-secondary">
      <h3>No videos to watch later</h3>
      <Link to="/explore" className="btn btn-primary">
        Explore
      </Link>
    </main>
  );
};

export { WatchLater };
