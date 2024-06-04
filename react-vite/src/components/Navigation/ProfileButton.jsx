import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from 'react-icons/fa';
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./ProfileButton.css"
import { useNavigate } from "react-router-dom";

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();
  const navigate = useNavigate()

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    navigate("/")
    closeMenu();
  };

  const manageProducts = (e) => {
    e.preventDefault()
    navigate("/products/my-products")
    closeMenu();
  }

  const createProduct = (e) => {
    e.preventDefault()
    navigate("/products/new-product")
    closeMenu();
  }

  return (
    <>
      <button onClick={toggleMenu} className="profile-cart-buttons">
        <FaUserCircle />
      </button>
      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <div className="profile-container">
              <div className="profile-upper-container">
                <li id="hello-user">Hello, {user.first_name}!</li>
                <li id="user-email">{user.email}</li>
              </div>
              <div className="profile-lower-container">
                <p id="user-menu">User Menu:</p>
                <li>
                  <button onClick={createProduct} className="user-buttons">Create Product</button>
                </li>
                <li>
                  <button onClick={manageProducts} className="user-buttons">Manage Products</button>
                </li>
                <li>
                  <button onClick={logout} className="user-buttons">Log Out</button>
                </li>
              </div>
            </div>
          ) : (
            <>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
