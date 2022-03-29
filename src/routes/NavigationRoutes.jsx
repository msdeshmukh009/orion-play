import { Routes, Route } from "react-router-dom";
import { Explore, PlaylistListing, Signin, SingleVideo, Signup, LikedVideos } from "../pages";
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
      <Route path="/playlist" element={<PlaylistListing />} />
      <Route path="/explore/:videoId" element={<SingleVideo />} />
      <Route path="/liked" element={<PrivateRoute element={LikedVideos} />} />
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
