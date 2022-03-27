import { StackedVideoItem } from "../../components";
import "./singlePlaylist.css";

const SinglePlaylist = () => {
  return (
    <main className="playlist-container">
      <section className="playlist-description">
        <div className="playlist-img-container">
          <img
            className="responsive-img"
            src="https://i.ytimg.com/vi/_erVOAbz420/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCLTS3HE2hVrjsA_n8UH2pSH7XXrw"
            alt="playlist-name"
          />
        </div>
        <div className="playlist-text-description flex-column">
          <span className="text-semibold">The Playlist</span>
          <span>8 videos</span>
        </div>
      </section>
      <section className="playlist-video-items flex-column">
        <StackedVideoItem />
        <StackedVideoItem />
        <StackedVideoItem />
        <StackedVideoItem />
        <StackedVideoItem />
      </section>
    </main>
  );
};

export { SinglePlaylist };
