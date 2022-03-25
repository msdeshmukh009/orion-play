import "./playlistCard.css";

const PlaylistCard = () => {
  return (
    <div className="playlist-card">
      <div className="playlist-card-img-container">
        <img
          className="responsive-img"
          src="https://i.ytimg.com/vi/_erVOAbz420/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCLTS3HE2hVrjsA_n8UH2pSH7XXrw"
          alt="thumbnail-img"
        />
        <div className="playlist-card-overlay-container flex-column flex-total-center">
          <span>8</span>
          <span className="material-icons">playlist_play</span>
        </div>
      </div>
      <div className="playlist-card-img-description">
        <span className="text-semibold">The Playlist</span>
      </div>
    </div>
  );
};

export { PlaylistCard };
