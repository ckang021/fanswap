import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { productSearch } from "../../redux/products";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { FaShoppingCart } from "react-icons/fa";
import navLogo from "./navlogoWhite.png"


function Navigation() {
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const submitSearch = async (e) => {
    e.preventDefault()
    await dispatch(productSearch(search))
    const query = search.split(' ').join('+')
    navigate(`/products/?name=${query}`)
    setSearch('')
  }

  const cartButton = (e) => {
    e.preventDefault()
    alert("Feature coming soon...")
  }

  const directAllProds = (e) => {
    e.preventDefault()
    navigate("/products")
  }
  return (
    <div>
      <ul className="nav-bar-top">
        <div className="nav-bar">
          <li>
            <NavLink to="/">
              <img src={navLogo} alt="fanswap-logo" id="nav-logo" />
            </NavLink>
          </li>

          <li>
            <form onSubmit={submitSearch}>
              <input
                type="text"
                placeholder="Search for products"
                value={search}
                onChange={handleSearch}
              />
              <button>Search</button>
            </form>
          </li>

          <li id="profile-cart-button">
            <button onClick={cartButton}>
              <FaShoppingCart />
            </button>
            <ProfileButton />
          </li>
        </div>
      </ul >
      <div className="nav-bar-bottom">
        <button onClick={directAllProds}>All Products</button>
        <button onClick={cartButton}>Hats</button>
        <button onClick={cartButton}>Jerseys</button>
        <button onClick={cartButton}>Apparel</button>
      </div>
    </div>
  );
}

export default Navigation;
