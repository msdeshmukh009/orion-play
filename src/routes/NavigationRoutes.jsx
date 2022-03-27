import { Routes, Route } from "react-router-dom";
import { Explore, PlaylistListing, SingleVideo } from "../pages";

const NavigationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Explore />} />
      <Route path="/playlist" element={<PlaylistListing />} />
      <Route path="/explore/:videoId" element={<SingleVideo />} />
    </Routes>
  );
};

export { NavigationRoutes };
