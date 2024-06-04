import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, NavLink } from "react-router-dom"
import { byCategoryProds } from "../../redux/products"
import { FaStar } from "react-icons/fa";
import "./CategoryProduct.css"

function CategoryProduct() {
  const { categoryId } = useParams()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const products = useSelector(state => state.products?.categorizedProds?.products || [])
  // console.log(products)

  useEffect(() => {
    if (categoryId) {
      setIsLoading(true)
      dispatch(byCategoryProds(categoryId)).then(() => {
        setIsLoading(false)
      })
    }
  }, [dispatch, categoryId]);


  return isLoading ? (
    <div className="loading-container">
      <div className="loading-animation"></div>
      <div className="loading-text">Loading products...</div>
    </div>
  ) : (
    <div className="all-products-wrapper">
      <h2>All {products[0]?.category_name}</h2>
      <div className="products-layout-container">
        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          products.slice().reverse().map(product => (
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

export default CategoryProduct
