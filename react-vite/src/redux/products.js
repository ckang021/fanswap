const LOAD_PRODUCTS = 'products/LOAD_PRODUCTS'
const USER_PRODUCTS = 'products/USER_PRODUCTS'

const loadProducts = (products) => ({
  type: LOAD_PRODUCTS,
  products,
})

const userProducts = (products) => ({
  type: USER_PRODUCTS,
  products,
})

export const allProducts = () => async (dispatch) => {
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

const initState = { allProducts: [], userProducts: [] }

const productsReducer = (state = initState, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return { ...state, allProducts: action.products }
    case USER_PRODUCTS:
      return { ...state, userProducts: action.products }
    default:
      return state;
  }
}

export default productsReducer
