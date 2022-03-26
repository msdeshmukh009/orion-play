import "./singleVideo.css";

const SingleVideo = () => {
  return (
    <main className="video-container grid-70-30">
      <section className="video-section">
        <iframe
          className="video-iframe"
          width="560"
          height="350"
          src="https://www.youtube.com/embed/1L2hrG-7i2Y"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>

        <div className="video-description">
          <h3>Time… a programmer's worst enemy // The Code Report</h3>

          <div className="video-cta">
            <button className="video-cta-buttons">
              <i className="fas fa-thumbs-up"></i>
            </button>

            <button className="video-cta-buttons">
              <i className="fas fa-clock"></i>
            </button>

            <button className="video-cta-buttons">
              <i className="fas fa-folder-plus"></i>
            </button>
          </div>

          <div className="creator-description flex-column">
            <div className="creator-img">
              <img
                className="responsive-img rounded-img"
                src="https://yt3.ggpht.com/ytc/AKedOLTcIl6kKt3lEPJEySUf_hpHiKDKiFeo9eWPReLysQ=s88-c-k-c0x00ffffff-no-rj"
                alt="fireship"
              />
              <span>Fireship</span>
            </div>
            <article>
              <p>
                Keeping track of time is complicated for programmers due to leap seconds, timezones,
                and the weirdly designed Gregorian calendar. A new bill is going through congress to
                make daylight savings time permanent - here's what that could mean for developers.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="notes-section flex-column">
        <h2>Notes</h2>
        <form className="notes-form">
          <div className="input-grp">
            <input className="form-field" type="text" required />
          </div>
          <div className="input-grp">
            <textarea className="form-field" cols="30" rows="10"></textarea>
          </div>
          <button className="btn btn-primary">Save note</button>
        </form>
        <div className="notes-card flex-column">
          <div className="card text-card">
            <h3>This is a Text card</h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam, vel.</p>
            <div className="card-cta-vertical">
              <button className="btn btn-outline text-primary-color">
                <i className="far fa-edit"></i>
              </button>
              <button className="btn btn-outline text-primary-color">
                <i className="far fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export { SingleVideo };
