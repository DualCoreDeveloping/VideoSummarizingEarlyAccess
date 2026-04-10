import "./Header.css";

export default function Header() {
  return (
    <div className="ea-nav">
      <div className="ea-nav-brand">
        <img className="ea-nav-logo" src="/DualCore/dc_logo.jpeg" alt="DualCore" />
        <span className="ea-nav-name">DualCore</span>
      </div>
      <div className="ea-nav-links">
        <span className="ea-nav-link">About</span>
        <span className="ea-nav-link ea-nav-link--active">Early access</span>
      </div>
    </div>
  );
}