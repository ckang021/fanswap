import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { productSearch } from "../../redux/products";
import ProfileButton from "./ProfileButton";
import { FaShoppingCart } from "react-icons/fa";
import navLogo from "./navlogoWhite.png"
import { FaSearch } from "react-icons/fa";
import "./Navigation.css";

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

  const directCategoryProds = (categoryId) => (e) => {
    e.preventDefault()
    navigate(`/products/category/${categoryId}`)
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
            <form onSubmit={submitSearch} className="search-bar-container">
              <FaSearch id="search-bar-button" onClick={submitSearch} />
              <input
                type="text"
                placeholder="Search for products"
                value={search}
                onChange={handleSearch}
                className="search-bar"
              />
            </form>
          </li>

          <li id="profile-cart-button-container">
            <FaShoppingCart className="profile-cart-buttons" onClick={cartButton} />
            <ProfileButton />
          </li>
        </div>
      </ul >
      <div className="nav-bar-bottom">
        <button onClick={directAllProds} className="nav-bottom-buttons"><span>All Products</span></button>
        <button onClick={directCategoryProds(1)} className="nav-bottom-buttons"><span>Hats</span></button>
        <button onClick={directCategoryProds(2)} className="nav-bottom-buttons"><span>Jerseys</span></button>
        <button onClick={directCategoryProds(3)} className="nav-bottom-buttons"><span>Apparel</span></button>
      </div>
    </div>
  );
}

export default Navigation;
