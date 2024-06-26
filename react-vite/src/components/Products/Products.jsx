import { useEffect, useState } from "react";
import { everyProducts, productSearch } from "../../redux/products";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, NavLink } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "./Products.css";

function Products() {
  const dispatch = useDispatch();
  const allProducts = useSelector(state => state.products.allProducts.products) || [];
  const searchResults = useSelector(state => state.products.search) || [];
  const [isLoading, setIsLoading] = useState(true);
  const [query] = useSearchParams();
  const querySearch = query.get('name')?.split(' ').join('+');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (querySearch) {
        await dispatch(productSearch(querySearch));
      } else {
        await dispatch(everyProducts());
      }
      setIsLoading(false);
    };

    fetchData();
  }, [dispatch, querySearch]);

  useEffect(() => {
    if (!querySearch && searchResults.length > 0) {
      dispatch(everyProducts());
    }
  }, [dispatch, querySearch, searchResults.length]);

  const productList = querySearch ? searchResults : allProducts;

  return isLoading ? (
    <div className="loading-container">
      <div className="loading-animation"></div>
      <div className="loading-text">Loading products...</div>
    </div>
  ) : (
    <div className="all-products-wrapper">
      <h2>All Products</h2>
      <div className="products-layout-container">
        {productList.length === 0 ? (
          <p>No products found</p>
        ) : (
          productList.slice().reverse().map(product => (
            <div key={product.id}>
              <NavLink to={`/products/${product.id}`} className="product-card">
                <img src={product.preview_image} alt={product.name} className="product-image" />
                <div className="product-details">
                  <p className="product-price">{product.price}</p>
                  <p className="product-name">{product.name}</p>
                  <p className="product-rating"><FaStar id="product-star" />{product.rating}</p>
                </div>
              </NavLink>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Products;
