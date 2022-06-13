import "./singleVideo.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useVideos } from "../../context";
import { useNavigate } from "react-router-dom";
import { embedLink, isPresentIn } from "../../utils";
import { useLikes, useWatchLater, useWatchHistory, useAuth, useNotes } from "../../hooks";
import { Loading, Modal, Tooltip } from "../../components";
import toast from "react-hot-toast";
import { NoteCard } from "./NoteCard";
import { NoteEditor } from "./NoteEditor";
import { NotFound } from "../not-found/NotFound";

const SingleVideo = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { videoId } = useParams();
  const {
    authState: {
      userDetails: { token },
    },
  } = useAuth();

  const {
    videoState: { videos, loading },
  } = useVideos();

  const {
    likesState: { likedList },
    addToLike,
    removeFromLike,
  } = useLikes();

  const {
    watchLaterState: { watchLaterVideos },
    addToWatchLater,
    removeFromWatchLater,
  } = useWatchLater();

  const {
    historyState: { history },
    addToHistory,
  } = useWatchHistory();

  const {
    notesState: { notes, loading: notesLoading, error: notesError },
    createNote,
    deleteNote,
    editNote,
  } = useNotes(videoId);

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
    if (token && !isPresentInHistory && video) {
      addToHistory(video);
    }
  }, [video]);

  return video ? (
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
            <Tooltip tooltipText={isLiked ? "Dislike" : "Like"}>
              <button className="video-cta-buttons" onClick={handleLike}>
                <i className={`fas fa-thumbs-up ${isLiked ? "text-primary-color" : ""}`}></i>
              </button>
            </Tooltip>

            <Tooltip tooltipText="Watchlater">
              <button className="video-cta-buttons" onClick={handleWatchLater}>
                <i
                  className={`fas fa-clock ${isPresentInWatchLater ? "text-primary-color" : ""}`}
                ></i>
              </button>
            </Tooltip>

            <Tooltip tooltipText="Playlists">
              <button className="video-cta-buttons" onClick={handleSaveToPlaylist}>
                <i className="fas fa-folder-plus"></i>
              </button>
            </Tooltip>
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
        <NoteEditor createNote={createNote} videoId={videoId} token={token} />
        {notesLoading && <span className="text-center">Fetching notes...</span>}
        {notesError && <span className="text-center">{notesError}</span>}
        {notes.map(note => (
          <NoteCard key={note._id} note={note} deleteNote={deleteNote} editNote={editNote} />
        ))}
      </section>
    </main>
  ) : loading ? (
    <Loading />
  ) : (
    <NotFound />
  );
};

export { SingleVideo };
