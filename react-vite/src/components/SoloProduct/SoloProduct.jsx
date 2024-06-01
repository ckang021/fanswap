import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { soloProduct } from "../../redux/product";
import { allProdImages } from "../../redux/images";
import { allProdReviews } from "../../redux/reviews";
import { FaStar } from "react-icons/fa";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import "./SoloProduct.css";
import DeleteProduct from "../DeleteProduct/DeleteProduct";
import AddProductImage from "../AddProductImage";
import ReviewForm from "../ReviewForm";

function SoloProduct() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");
  const [userList, setUserList] = useState([]);
  const sessionUser = useSelector(state => state.session.user);
  const product = useSelector(state => state.product?.product?.product);
  const images = useSelector(state => state.images?.images);
  const reviews = useSelector(state => state.reviews?.reviews);

  useEffect(() => {
    async function fetchProdData() {
      setIsLoading(true);
      await dispatch(soloProduct(productId));
      await dispatch(allProdImages(productId));
      await dispatch(allProdReviews(productId));
      setIsLoading(false);
    }
    fetchProdData();
  }, [dispatch, productId]);

  useEffect(() => {
    async function fetchUserData() {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUserList(data.users);
    }
    fetchUserData();
  }, []);

  useEffect(() => {
    if (product && product.preview_image) {
      setMainImage(product.preview_image);
    } else if (images?.ProductImages?.length > 0) {
      setMainImage(images.ProductImages[0].image_file);
    }
  }, [product, images]);

  const cartButton = (e) => {
    e.preventDefault();
    alert("Feature coming soon...");
  };

  const handleImageClick = (image) => {
    setMainImage(image.image_file);
  };

  const editProduct = (e) => {
    e.preventDefault();
    navigate(`/products/${productId}/edit`);
  };

  const addReview = (e) => {
    e.preventDefault()
    navigate(`/products/${productId}/reviews/new`)
  }

  // const imageArray = product?.preview_image
  //   ? [{ image_file: product.preview_image }, ...(images?.ProductImages || [])]
  //   : images?.ProductImages || [];

  const filteredImageArray = images?.ProductImages
    ? images.ProductImages.filter((image) => image.image_file !== product?.preview_image)
    : [];

  return isLoading ? (
    <div className="loading-container">
      <div className="loading-animation"></div>
      <div className="loading-text">Loading products...</div>
    </div>
  ) : (
    <div className="product-detail-container">
      <div className="product-images-container">
        <div className="main-image-scroll">
          {mainImage && <img src={mainImage} alt="Main product" className="main-image-pd" />}
        </div>
        <div className="sub-image-bottom">
          {product?.preview_image && (
            <img
              src={product.preview_image}
              alt="Preview product"
              className={`sub-image-pd ${product.preview_image === mainImage ? "selected-image" : ""}`}
              onClick={() => handleImageClick({ image_file: product.preview_image })}
            />
          )}
          {filteredImageArray.map((image, index) => (
            <img
              key={index}
              src={image.image_file}
              alt=""
              className={`sub-image-pd ${image.image_file === mainImage ? "selected-image" : ""}`}
              onClick={() => handleImageClick(image)}
            />
          ))}
        </div>
      </div>
      <div className="product-details-text">
        <div className="manage-products-buttons">
          {sessionUser && sessionUser.id === product?.owner_id && (
            <button onClick={editProduct}>Update Product</button>
          )}
          {sessionUser && sessionUser.id === product?.owner_id && (
            <OpenModalButton
              className='delete-product'
              buttonText='Delete'
              modalComponent={<DeleteProduct productId={productId} />}
            />
          )}
          {sessionUser && sessionUser.id === product?.owner_id && images?.ProductImages?.length < 2 && (
            <OpenModalButton
              className='delete-product'
              buttonText='Add Images'
              modalComponent={<AddProductImage productId={productId} />}
            />
          )}
        </div>

        <h1>{product?.name}</h1>
        {product?.price}
        <div>{product?.description}</div>
        <button onClick={cartButton}>Add to Cart</button>

        <div className="product-reviews">
          <h2>Reviews</h2>
          {sessionUser && sessionUser.id !== product?.owner_id &&
            !reviews?.reviews.find(review => review.user_id === sessionUser.id) && (
              <button onClick={addReview}>Write a Review</button>
            )}
          {!reviews?.reviews.length && <p>Be the first to post a review!</p>}
          {reviews?.reviews && reviews?.reviews.map(review => {
            const user = userList ? userList.find(user => user.id == review.user_id) : null;
            return (
              <div className="reviewer-box" key={review.id}>
                <p>{user ? user.username : null}</p>
                <p>{review?.review}</p>
                <div className="star-rating">
                  <FaStar />
                  {review?.star_rating}
                </div>
                {sessionUser && review.user_id === sessionUser.id && (
                  <div className="review-edit-delete-buttons">
                    {/* <OpenModalButton buttonText='Delete' modalComponent={<DeleteReview productId={productId} reviewId={review.id} />} /> */}
                    <button onClick={() => navigate(`/products/${productId}/reviews/${review.id}/edit`)}>Edit</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SoloProduct;
