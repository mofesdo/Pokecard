import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <nav className="header">
      <h1 className="header__title">PokeCard</h1>
      <div className="header__container">
        <Link to="/" className="header__link">
           <button className="header__button">
          Home
        </button>
        </Link>
        <button disabled title="Coming Soon">
          My Catch Cards
        </button>
      </div>
    </nav>
  );
}

export default Header;
