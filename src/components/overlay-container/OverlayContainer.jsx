import "./overlayContainer.css";

const OverlayContainer = ({ children, display }) => {
  return <div className={display ? "overlay-container" : "hide-overlay"}>{children}</div>;
};
export { OverlayContainer };
