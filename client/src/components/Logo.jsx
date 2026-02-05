import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="logoLink" aria-label="Go to Home">
      <div className="logo">
        <div className="logoMark" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M13 2L3 14h8l-1 8 11-14h-8l0-6z" fill="#0b0b0b" />
          </svg>
        </div>
        <div className="logoText">EdUp</div>
      </div>
    </Link>
  );
}
