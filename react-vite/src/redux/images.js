const PRODUCT_IMAGES_ALL = 'images/PRODUCT_IMAGES_ALL'

const allProductImages = (images) => ({
  type: PRODUCT_IMAGES_ALL,
  images
})

export const allProdImages = (productId) => async (dispatch) => {
  const res = await fetch(`/api/products/${productId}/imgs`);
  const data = await res.json()
  if (res.ok) {
    dispatch(allProductImages(data))
  }
  return data;
}

const initState = {}
const imagesReducer = (state = initState, action) => {
  switch (action.type) {
    case PRODUCT_IMAGES_ALL:
      return { ...state, images: action.images }
    default:
      return state;
  }
}

export default imagesReducer
