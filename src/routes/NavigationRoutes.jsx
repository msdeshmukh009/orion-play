import { Routes, Route } from "react-router-dom";
import { Explore, PlaylistListing, Signin, SingleVideo, Signup } from "../pages";

const NavigationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Explore />} />
      <Route path="/playlist" element={<PlaylistListing />} />
      <Route path="/explore/:videoId" element={<SingleVideo />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export { NavigationRoutes };
