import { useState } from "react";
import { usePlaylist } from "../../context";
import { Loading } from "../loading/Loading";
import toast from "react-hot-toast";
import "./modal.css";

const Modal = ({ showModal, setShowModal, video }) => {
  const {
    playlistState: { playlists, loading, error },
    createPlaylist,
    removeFromPlaylist,
    addVideoToPlaylist,
  } = usePlaylist();

  const [isCreating, setIsCreating] = useState(false);
  const [playlistName, setPlaylistName] = useState("");

  return (
    <div
      className={`modal-background ${showModal ? "flex-total-center" : ""}`}
      onClick={e => {
        setShowModal(
          !(e.target.classList.contains("modal-background") || e.target.classList.contains("fas"))
        );
      }}
    >
      <div className="dialog-box">
        <div className="dialog-header">
          <h3>Save to</h3>
        </div>
        <button className="modal-close-btn modal-action-btn" onClick={() => setShowModal(false)}>
          <i className="fas fa-times"></i>
        </button>

        {playlists.length ? (
          <ul className="dialog-list list-overflow no-style-list">
            {loading ? (
              <Loading />
            ) : (
              playlists.map(playlist => (
                <label key={playlist._id} className="checkbox">
                  <input
                    className="dialog-radio-button"
                    type="checkbox"
                    checked={
                      playlist?.videos.find(playlistVideo => playlistVideo._id == video._id)
                        ? true
                        : false
                    }
                    onChange={() => {
                      playlist?.videos.find(playlistVideo => playlistVideo._id == video._id)
                        ? removeFromPlaylist(playlist._id, video._id)
                        : addVideoToPlaylist(video, playlist._id);
                    }}
                  />
                  {playlist.title}
                </label>
              ))
            )}
          </ul>
        ) : (
          <div className="dialog-content-secondary">No playlists available</div>
        )}

        {isCreating ? (
          <form className="playlist-form flex-total-center flex-column">
            <div className="input-grp">
              <input
                type="text"
                className="form-field"
                required
                value={playlistName}
                onChange={e => setPlaylistName(e.target.value)}
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={e => {
                e.preventDefault();
                if (playlistName.trim().length) {
                  createPlaylist(playlistName, video);
                  setPlaylistName("");
                } else {
                  toast.error("Playlist name can not be empty");
                }
              }}
            >
              Create
            </button>
          </form>
        ) : (
          <div className="dialog-cta">
            <button
              className="btn btn-outline block-btn confirmation-dialog-box-close-btn"
              onClick={() => setIsCreating(true)}
            >
              Create new playlist
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export { Modal };
