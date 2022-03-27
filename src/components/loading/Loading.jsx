import "./loading.css";
const Loading = () => {
  return (
    <div className="flex-total-center loading-container">
      <div className="loader">
        <img className="responsive-img" src="/assets/Rolling-1s-200px.svg" alt="loading" />
      </div>
    </div>
  );
};

export { Loading };
