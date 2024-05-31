const LOAD_PRODUCTS = 'products/LOAD_PRODUCTS'
const USER_PRODUCTS = 'products/USER_PRODUCTS'
const SEARCH_PRODUCTS = 'products/SEARCH_PRODUCTS'

const loadProducts = (products) => ({
  type: LOAD_PRODUCTS,
  products,
})

const userProducts = (products) => ({
  type: USER_PRODUCTS,
  products,
})

const searchProducts = (products) => ({
  type: SEARCH_PRODUCTS,
  products,
})

export const everyProducts = () => async (dispatch) => {
  const res = await fetch(`/api/products`);
  const data = await res.json()
  if (res.ok) {
    dispatch(loadProducts(data));
  }
  return data;
}

export const ownedProducts = () => async (dispatch) => {
  const res = await fetch('/api/products/my-products')
  const data = await res.json()
  if (res.ok) {
    dispatch(userProducts(data))
  }
  return data;
}

export const productSearch = (query) => async (dispatch) => {
  try {
    const res = await fetch(`/api/products?name=${query}`);
    if (!res.ok) {
      throw new Error('Failed to search products');
    }
    const data = await res.json();
    dispatch(searchProducts(data.products));
    return data.products;
  } catch (error) {
    console.error(error);
  }
}

const initState = { allProducts: [], userProducts: [], search: [] }

const productsReducer = (state = initState, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return { ...state, allProducts: action.products }
    case USER_PRODUCTS:
      return { ...state, userProducts: action.products }
    case SEARCH_PRODUCTS:
      return { ...state, search: action.products }
    default:
      return state;
  }
}

export default productsReducer
