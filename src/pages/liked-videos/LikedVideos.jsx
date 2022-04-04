import { Link } from "react-router-dom";
import { StackedVideoItem } from "../../components";
import { useLikes } from "../../hooks";
import { thumbnailLink } from "../../utils";
import "../single-playlist/singlePlaylist.css";

const LikedVideos = () => {
  const {
    likesState: { likedList },
    removeFromLike,
  } = useLikes();

  return likedList.length ? (
    <main className="playlist-container">
      <section className="playlist-description">
        <div className="playlist-img-container">
          <img
            className="responsive-img"
            src={thumbnailLink(likedList[0]?._id)}
            alt="playlist-name"
          />
        </div>
        <div className="playlist-text-description flex-column">
          <span className="text-semibold">Liked Videos</span>
          <span>{likedList.length} videos</span>
        </div>
      </section>
      <section className="playlist-video-items flex-column">
        {likedList.map(video => (
          <StackedVideoItem key={video._id} video={video} removeFunction={removeFromLike} />
        ))}
      </section>
    </main>
  ) : (
    <main className="flex-total-center flex-column playlist-container-secondary">
      <h3>No liked videos</h3>
      <Link to="/explore" className="btn btn-primary">
        Explore
      </Link>
    </main>
  );
};

export { LikedVideos };
