import { useParams, Link } from "react-router-dom";
import { StackedVideoItem } from "../../components";
import { usePlaylist } from "../../hooks";
import { thumbnailLink } from "../../utils";
import "./singlePlaylist.css";

const SinglePlaylist = () => {
  const {
    playlistState: { playlists },
    removeFromPlaylist,
  } = usePlaylist();

  const { playlistId } = useParams();

  const playlist = playlists.find(playlist => playlist?._id === playlistId);

  return (
    <main className="playlist-container">
      <section className="playlist-description">
        <div className="playlist-img-container">
          <img
            className="responsive-img"
            src={
              playlist?.videos.length
                ? thumbnailLink(playlist?.videos[0]?._id)
                : "/assets/undraw_going_up_re_86kg.svg"
            }
            alt="playlist-name"
          />
        </div>
        <div className="playlist-text-description flex-column">
          <span className="text-semibold">{playlist?.title}</span>
          <span>{playlist?.videos?.length} videos</span>
        </div>
      </section>
      {playlist?.videos.length ? (
        <section className="playlist-video-items flex-column">
          {playlist?.videos?.map(video => (
            <StackedVideoItem
              video={video}
              key={video._id}
              removeFunction={removeFromPlaylist}
              playlistId={playlist?._id}
            />
          ))}
        </section>
      ) : (
        <section className="playlist-video-items flex-total-center flex-column">
          <h3 className="text-center">No videos added</h3>
          <Link to="/explore" className="btn btn-primary">
            Explore
          </Link>
        </section>
      )}
    </main>
  );
};

export { SinglePlaylist };
