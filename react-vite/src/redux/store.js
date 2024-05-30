import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import productReducer from "./product";
import productsReducer from "./products";
import imagesReducer from "./images";
import imageReducer from "./image";
import reviewReducer from "./review";
import reviewsReducer from "./reviews";

const rootReducer = combineReducers({
  session: sessionReducer,
  product: productReducer,
  products: productsReducer,
  images: imagesReducer,
  image: imageReducer,
  review: reviewReducer,
  reviews: reviewsReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
