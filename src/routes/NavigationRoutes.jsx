import { Routes, Route } from "react-router-dom";
import { Explore, PlaylistListing } from "../pages";

const NavigationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Explore />} />
      <Route path="/playlist" element={<PlaylistListing />} />
    </Routes>
  );
};

export { NavigationRoutes };
