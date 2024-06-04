import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, NavLink } from "react-router-dom"
import { ownedProducts } from "../../redux/products"
import { FaStar } from "react-icons/fa";
import "./ManageProducts.css"

function ManageProducts() {
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userProducts = useSelector(state => state.products?.userProducts?.products)

  useEffect(() => {
    setIsLoading(true)
    dispatch(ownedProducts())
      .then(() => setIsLoading(false))
  }, [dispatch])

  function newProduct(e) {
    e.preventDefault()
    navigate("/products/new-product")
  }

  return isLoading ? (
    <div className="loading-container">
      <div className="loading-animation"></div>
      <div className="loading-text">Loading products...</div>
    </div>
  ) : (
    <div className="all-products-wrapper">
      <h2>Your Products</h2>
      <button onClick={newProduct}>Post a New Product</button>
      <div className="products-layout-container">
        {userProducts.length === 0 ? (
          <p>No products found</p>
        ) : (
          userProducts.map(product => (
            <div key={product.id} className="product-card">
              <NavLink to={`/products/${product.id}`}>
                <img src={product.preview_image} alt={product.name} className="product-image" />
                <div>
                  <p>{product.name}</p>
                  <p>{product.price}</p>
                  <p><FaStar />{product.rating}</p>
                </div>
              </NavLink>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ManageProducts
