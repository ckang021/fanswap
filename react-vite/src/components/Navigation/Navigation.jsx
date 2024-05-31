import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { FaShoppingCart } from "react-icons/fa";
import navLogo from "./navlogoWhite.png"

function Navigation() {
  const cartButton = (e) => {
    e.preventDefault()
    alert("Feature coming soon...")
  }
  return (
    <ul>
      <div className="nav-bar">
        <li>
          <NavLink to="/">
            <img src={navLogo} alt="fanswap-logo" id="nav-logo" />
          </NavLink>
        </li>

        <li id="profile-cart-button">
          <button onClick={cartButton}>
            <FaShoppingCart />
          </button>
          <ProfileButton />
        </li>
      </div>
    </ul>
  );
}

export default Navigation;
