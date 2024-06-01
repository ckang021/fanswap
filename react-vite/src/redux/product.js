const SINGLE_PRODUCT = 'product/SINGLE_PRODUCT';
const CREATE_PRODUCT = 'product/CREATE_PRODUCT';
const EDIT_PRODUCT = 'product/EDIT_PRODUCT';
const DELETE_PRODUCT = 'product/DELETE_PRODUCT';

const singleProduct = (product) => ({
  type: SINGLE_PRODUCT,
  product,
})

const createProduct = (product) => ({
  type: CREATE_PRODUCT,
  product,
})

const editProduct = (product) => ({
  type: EDIT_PRODUCT,
  product,
})

const deleteProduct = (productId) => ({
  type: DELETE_PRODUCT,
  productId,
})

export const soloProduct = (id) => async (dispatch) => {
  const res = await fetch(`/api/products/${id}`);
  const data = await res.json()
  if (res.ok) {
    dispatch(singleProduct(data));
  }
  return data;
}

export const createNewProduct = (formData) => async (dispatch) => {
  const res = await fetch('/api/products/new-product', {
    method: "POST",
    body: formData,
  })

  const data = await res.json()
  if (res.ok) {
    dispatch(createProduct(data))
    return data;
  } else {
    return data
  }
}

export const updateProduct = (id, product) => async (dispatch) => {
  const res = await fetch(`/api/products/${id}`, {
    method: 'PUT',
    body: product,
  });

  const data = await res.json();
  if (res.ok) {
    dispatch(editProduct(data));
    return data;
  } else {
    return data;
  }
};


export const removeProduct = (id) => async (dispatch) => {
  const res = await fetch(`/api/products/${id}`, {
    method: "DELETE",
  })

  const data = await res.json()
  if (res.ok) {
    dispatch(deleteProduct(data));
  }
  return data;
}

const initState = {};

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case SINGLE_PRODUCT:
      return { ...state, product: action.product };
    case CREATE_PRODUCT:
      return { ...state, product: action.product };
    case EDIT_PRODUCT:
      return { ...state, product: action.product };
    case DELETE_PRODUCT:
      return { ...state, product: null }
    default:
      return state;
  }
};



export default productReducer
