const NEW_IMAGE = 'image/NEW_IMAGE';
const DELETE_IMAGE = 'image/DELETE_IMAGE';
const SOLO_IMAGE = 'image/SOLO_IMAGE';

const createImage = (image) => ({
  type: NEW_IMAGE,
  image,
})

const removeImage = (imageId) => ({
  type: DELETE_IMAGE,
  imageId,
})

const singleImage = (image) => ({
  type: SOLO_IMAGE,
  image,
})

export const addImage = (productId, formData) => async (dispatch) => {
  const res = await fetch(`/api/product/${productId}/imgs/new`, {
    method: 'POST',
    body: formData,
  })

  const data = await res.json();
  if (res.ok) {
    dispatch(createImage(data));
    return data
  } else {
    return data;
  }
}

export const deleteImage = (imageId) => async (dispatch) => {
  const res = await fetch(`/api/imgs/${imageId}`, {
    method: 'DELETE',
  })

  const data = await res.json();
  if (res.ok) {
    dispatch(removeImage(imageId)); //potential bug??
    return data;
  } else {
    return data;
  }
}

export const soloImage = (imageId) => async (dispatch) => {
  const res = await fetch(`/api/imgs/${imageId}`);
  const data = await res.json();
  if (res.ok) {
    dispatch(singleImage(data))
    return data;
  } else {
    return data;
  }
}

const initState = { images: {}, singleImage: null }

const imageReducer = (state = initState, action) => {
  switch (action.type) {
    case NEW_IMAGE:
      return { ...state, images: { ...state.images, [action.image.id]: action.image } }
    case DELETE_IMAGE:
      const newState = { ...state };
      delete newState.images[action.imageId];
      return newState
    case SOLO_IMAGE:
      return { ...state, singleImage: action.image }
    default:
      return state;
  }
}

export default imageReducer
