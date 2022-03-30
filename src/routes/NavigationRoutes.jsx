import { Routes, Route } from "react-router-dom";
import {
  Explore,
  PlaylistListing,
  Signin,
  SingleVideo,
  Signup,
  LikedVideos,
  SinglePlaylist,
} from "../pages";
import { PrivateRoute } from "./PrivateRoute";
import Mockman from "mockman-js";
import { useAuth } from "../context";

const NavigationRoutes = () => {
  const {
    authState: { token },
  } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Explore />} />
      <Route path="/explore/:videoId" element={<SingleVideo />} />
      <Route path="/playlist/:playlistId" element={<SinglePlaylist />} />
      <Route path="/liked" element={<PrivateRoute element={LikedVideos} />} />
      <Route path="/playlist" element={<PrivateRoute element={PlaylistListing} />} />
      {!token ? (
        <>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </>
      ) : (
        <>
          <Route path="/signin" element={<Navigate replace to="/" />} />
          <Route path="/signup" element={<Navigate replace to="/" />} />
        </>
      )}
      <Route path="/mockman" element={<Mockman />} />
    </Routes>
  );
};

export { NavigationRoutes };
