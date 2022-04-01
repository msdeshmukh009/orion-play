import { Link } from "react-router-dom";
import { Loading, StackedVideoItem } from "../../components";
import { useWatchHistory } from "../../context";
import { thumbnailLink } from "../../utils";
import "../single-playlist/singlePlaylist.css";

const History = () => {
  const {
    historyState: { history },
    loading,
    error,
    removeFromHistory,
    clearHistory,
  } = useWatchHistory();

  return loading ? (
    <Loading />
  ) : history.length ? (
    <main className="playlist-container">
      <section className="playlist-description">
        <div className="playlist-img-container">
          <img
            className="responsive-img"
            src={thumbnailLink(history[0]?._id)}
            alt="playlist-name"
          />
        </div>
        <div className="playlist-text-description flex-column">
          <span className="text-semibold"> History</span>
          <span>{history.length} videos</span>
          <button className="btn btn-secondary" onClick={() => clearHistory()}>
            Clear history
          </button>
        </div>
      </section>
      <section className="playlist-video-items flex-column">
        {history.map(video => (
          <StackedVideoItem key={video._id} video={video} removeFunction={removeFromHistory} />
        ))}
      </section>
    </main>
  ) : (
    <main className="flex-total-center flex-column playlist-container-secondary">
      <h3>Nothing in history</h3>
      <Link to="/" className="btn btn-primary">
        Explore
      </Link>
    </main>
  );
};

export { History };
