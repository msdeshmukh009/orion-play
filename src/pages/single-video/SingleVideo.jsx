import "./singleVideo.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth, useLikes, useVideos, useWatchHistory, useWatchLaterVideos } from "../../context";
import { useNavigate } from "react-router-dom";
import { embedLink, isPresentIn } from "../../utils";
import { Modal } from "../../components";
import toast from "react-hot-toast";

const SingleVideo = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { videoId } = useParams();
  const {
    videoState: { videos },
  } = useVideos();

  const {
    likesState: { likedList },
    addToLike,
    removeFromLike,
  } = useLikes();

  const {
    authState: {
      userDetails: { token },
    },
  } = useAuth();

  const {
    watchLaterState: { watchLaterVideos },
    addToWatchLater,
    removeFromWatchLater,
  } = useWatchLaterVideos();

  const {
    historyState: { history },
    addToHistory,
  } = useWatchHistory();

  const video = videos.find(eachVideo => eachVideo._id === videoId);

  const { isLiked, isPresentInWatchLater, isPresentInHistory } = isPresentIn(
    videoId,
    likedList,
    watchLaterVideos,
    history
  );

  const handleWatchLater = () => {
    token
      ? isPresentInWatchLater
        ? removeFromWatchLater(videoId)
        : addToWatchLater(video)
      : navigate("/signin");
  };

  const handleLike = () => {
    token ? (isLiked ? removeFromLike(videoId) : addToLike(video)) : navigate("/signin");
  };

  const handleSaveToPlaylist = () => {
    if (token) {
      setShowModal(true);
    } else {
      toast.error("Please login to continue");
      navigate("/signin");
    }
  };

  useEffect(() => {
    token ? (!isPresentInHistory ? addToHistory(video) : null) : null;
  }, []);

  return (
    <main className="video-container grid-70-30">
      <Modal showModal={showModal} setShowModal={setShowModal} video={video} />
      <section className="video-section">
        <iframe
          className="video-iframe"
          width="560"
          height="450"
          src={embedLink(videoId)}
          title="YouTube video player"
          frameBorder="0"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

        <div className="video-description">
          <h3>{video?.title}</h3>

          <div className="video-cta">
            <button className="video-cta-buttons" onClick={handleLike}>
              <i className={`fas fa-thumbs-up ${isLiked ? "text-primary-color" : ""}`}></i>
            </button>

            <button className="video-cta-buttons" onClick={handleWatchLater}>
              <i
                className={`fas fa-clock ${isPresentInWatchLater ? "text-primary-color" : ""}`}
              ></i>
            </button>

            <button className="video-cta-buttons" onClick={handleSaveToPlaylist}>
              <i className="fas fa-folder-plus"></i>
            </button>
          </div>

          <div className="creator-description flex-column">
            <div className="creator-img">
              <img
                className="responsive-img rounded-img"
                src={video?.creatorImg}
                alt={video?.creator}
              />
              <span>{video?.creator}</span>
            </div>
            <article>
              <p>{video?.description}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="notes-section flex-column">
        <h2 className="text-center">Notes</h2>
        <form className="notes-form">
          <div className="input-grp">
            <input className="form-field" type="text" required />
          </div>
          <div className="input-grp">
            <textarea className="form-field" cols="30" rows="10"></textarea>
          </div>
          <button className="btn btn-primary">Save note</button>
        </form>

        <div className="notes-card flex-column">
          <div className="card text-card">
            <h3>This is a Text card</h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam, vel.</p>
            <div className="card-cta-vertical">
              <button className="btn btn-outline text-primary-color">
                <i className="far fa-edit"></i>
              </button>
              <button className="btn btn-outline text-primary-color">
                <i className="far fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export { SingleVideo };
