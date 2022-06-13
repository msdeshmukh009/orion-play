import "./tooltip.css";

const Tooltip = ({ children, tooltipText }) => {
  return (
    <div className="tooltip">
      {children}
      <span className="tooltip-text">{tooltipText}</span>
    </div>
  );
};
export { Tooltip };
