const PRODUCT_REVIEWS_ALL = 'reviews/PRODUCT_REVIEWS_ALL';

const allProductReviews = (reviews) => ({
  type: PRODUCT_REVIEWS_ALL,
  reviews,
})

export const allProdReviews = (id) => async (dispatch) => {
  const res = await fetch(`/api/products/${id}/reviews`);
  const data = await res.json();
  if (res.ok) {
    dispatch(allProductReviews(data));
    return data;
  } else {
    return data;
  }
}

const initState = { reviews: [] };

const reviewsReducer = (state = initState, action) => {
  switch (action.type) {
    case PRODUCT_REVIEWS_ALL:
      return { ...state, reviews: action.reviews };
    default:
      return state
  }
}

export default reviewsReducer
