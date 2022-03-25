import { PlaylistCard } from "../../components";
import "./playlistListing.css";

const PlaylistListing = () => {
  return (
    <main className="playlist-listing-container">
      <PlaylistCard />
      <PlaylistCard />
      <PlaylistCard />
      <PlaylistCard />
      <PlaylistCard />
      <PlaylistCard />
    </main>
  );
};

export { PlaylistListing };
