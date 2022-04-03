import { useState } from "react";
import { Loading, PlaylistCard } from "../../components";
import { usePlaylist } from "../../hooks";
import toast from "react-hot-toast";
import "./playlistListing.css";

const PlaylistListing = () => {
  const {
    playlistState: { playlists, loading },
    createPlaylist,
  } = usePlaylist();

  const [isCreating, setIsCreating] = useState(false);
  const [playlistName, setPlaylistName] = useState("");

  const submitPlaylistHandler = e => {
    e.preventDefault();
    if (playlistName.length) {
      createPlaylist(playlistName);
      setPlaylistName("");
      setIsCreating(false);
    } else {
      toast.error("Playlist name can not be empty");
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <main className="playlist-listing-container">
          <div className="form-card flex-total-center flex-column">
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
                <div className="flex-total-center">
                  <button className="btn btn-primary" onClick={e => submitPlaylistHandler(e)}>
                    Create
                  </button>
                  <button className="btn btn-secondary" onClick={() => setIsCreating(false)}>
                    Discard
                  </button>
                </div>
              </form>
            ) : (
              <div
                className="flex-total-center flex-column add-new-playlist-container"
                onClick={() => setIsCreating(true)}
              >
                <h3>Add New Playlist</h3>
                <i className="fas fa-plus"></i>
              </div>
            )}
          </div>
          {playlists.map(playlist => (
            <PlaylistCard playlist={playlist} key={playlist._id} />
          ))}
        </main>
      )}
    </div>
  );
};

export { PlaylistListing };
