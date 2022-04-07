import { Routes, Route } from "react-router-dom";
import {
  Explore,
  PlaylistListing,
  Signin,
  SingleVideo,
  Signup,
  LikedVideos,
  SinglePlaylist,
  WatchLater,
  History,
  Home,
  NotFound,
} from "../pages";
import { PrivateRoute } from "./PrivateRoute";
import Mockman from "mockman-js";
import { useAuth } from "../hooks";

const NavigationRoutes = () => {
  const {
    authState: { token },
  } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/explore/:videoId" element={<SingleVideo />} />
      <Route path="/playlist/:playlistId" element={<SinglePlaylist />} />
      <Route path="/liked" element={<PrivateRoute element={LikedVideos} />} />
      <Route path="/playlist" element={<PrivateRoute element={PlaylistListing} />} />
      <Route path="/watch-later" element={<PrivateRoute element={WatchLater} />} />
      <Route path="/history" element={<PrivateRoute element={History} />} />
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
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export { NavigationRoutes };
