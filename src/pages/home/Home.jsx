import "./home.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCategory, useVideos } from "../../context";
import { videosActions } from "../../reducers/actionTypes";

const Home = () => {
  const {
    categoryState: { categories, loading, error },
  } = useCategory();

  const navigate = useNavigate();

  const { videoDispatch } = useVideos();

  const handleNavigate = categoryName => {
    videoDispatch({ type: videosActions.SET_CATEGORY, payload: "all" });
    videoDispatch({ type: videosActions.SET_CATEGORY, payload: categoryName });
    navigate("/explore");
  };
  return (
    <main
      className="home-main-container flex-total-center flex-column"
      style={{ backgroundImage: `url(/assets/bg-img5.jpg)` }}
    >
      <section className="banner flex-total-center">
        <div className="banner-content text-center flex-column">
          <h2 className="banner-heading">The orion Play</h2>
          <div className="banner-cta flex-total-center">
            <Link to="/explore" className="btn btn-primary">
              Watch now
            </Link>
          </div>
        </div>
        <div className="category-section flex-total-center">
          <h1>Categories</h1>
          <div className="flex-total-center categories">
            {categories.map(({ _id, categoryName }) => {
              return (
                <div
                  className="category-link"
                  key={_id}
                  onClick={() => handleNavigate(categoryName)}
                >
                  {categoryName}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export { Home };
