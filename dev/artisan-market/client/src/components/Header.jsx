import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand">CoastalCraft</Link>
        {/* <span className="tagline">Handmade in coastal Karnataka</span> */}
      </div>
    </header>
  );
}