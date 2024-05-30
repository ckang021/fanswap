const SOLO_REVIEW = 'review/SOLO_REVIEW'
const CREATE_REVIEW = 'review/NEW_REVIEW'
const EDIT_REVIEW = 'review/EDIT_REVIEW'
const DELETE_REVIEW = 'review/DELETE_REVIEW'

const soloReview = (review) => ({
  type: SOLO_REVIEW,
  review,
})

const createReview = (review) => ({
  type: CREATE_REVIEW,
  review,
})

const editReview = (review) => ({
  type: EDIT_REVIEW,
  review,
})

const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId,
})

export const singleReview = (reviewId) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${reviewId}`);
  const data = await res.json()
  if (res.ok) {
    dispatch(soloReview(data))
    return data;
  } else {
    return data;
  }
}

export const addReview = (productId, review) => async (dispatch) => {
  const res = await fetch(`/api/products/${productId}/reviews/new`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(review)
  })

  const data = await res.json();
  if (res.ok) {
    dispatch(createReview(data));
    return data;
  } else {
    return data;
  }
}

export const updateReview = (reviewId, review) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${reviewId}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(review)
  })

  const data = await res.json()
  if (res.ok) {
    dispatch(editReview(data))
    return data;
  } else {
    return data;
  }
}

export const removeReview = (reviewId) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
  })
  const data = await res.json()
  if (res.ok) {
    dispatch(deleteReview(reviewId)) //potential bug??
    return data;
  } else {
    return data;
  }
}

const initState = { oneReview: {}, allReviews: [] };

const reviewReducer = (state = initState, action) => {
  switch (action.type) {
    case SOLO_REVIEW:
      return { ...state, oneReview: action.review }
    case CREATE_REVIEW:
      return { ...state, allReviews: [...state.allReviews, action.review], oneReview: action.review }
    case EDIT_REVIEW:
      return { ...state, allReviews: state.allReviews.map((review) => review.id === action.review.id ? action.review : review), oneReview: action.review }
    case DELETE_REVIEW:
      return { ...state, allReviews: state.allReviews.filter((review) => review.id !== action.reviewId), oneReview: state.oneReview.id === action.reviewId ? {} : state.oneReview }
    default:
      return state;
  }
}

export default reviewReducer
