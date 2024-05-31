import { useEffect } from "react";
import { everyProducts, productSearch } from "../../redux/products";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, NavLink } from "react-router-dom";
import "./Products.css";

function Products() {
  const dispatch = useDispatch();

  const allProducts = useSelector(state => state.products.allProducts.products) || [];
  const searchResults = useSelector(state => state.products.search) || [];

  const [query] = useSearchParams();
  const querySearch = query.get('name')?.split(' ').join('+');

  useEffect(() => {
    if (querySearch) {
      dispatch(productSearch(querySearch));
    } else {
      dispatch(everyProducts());
    }
  }, [dispatch, querySearch]);

  useEffect(() => {
    if (!querySearch && searchResults.length > 0) {
      dispatch(everyProducts());
    }
  }, [dispatch, querySearch, searchResults.length]);

  const productList = querySearch && searchResults.length > 0 ? searchResults : allProducts;

  return (
    <div className="all-products-wrapper">
      <h2>All Products</h2>
      <div className="products-layout-container">
        {productList.length === 0 ? (
          <p>No products found</p>
        ) : (
          productList.map(product => (
            <div key={product.id} className="product-card">
              <NavLink to={`/products/${product.id}`}>
                <img src={product.preview_image} alt={product.name} />
                <div>
                  <p>{product.name}</p>
                  <p>{product.price}</p>
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
