import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { soloProduct } from "../../redux/product";
import { allProdImages } from "../../redux/images";
import { allProdReviews } from "../../redux/reviews";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import DeleteProduct from "../DeleteProduct/DeleteProduct";
import AddProductImage from "../AddProductImage";
import DeleteReview from "../DeleteReview";
import DeleteProductImage from "../DeleteProductImage";
import { FaStar } from "react-icons/fa";
import sadFan from "./sadnflfan.jpg";
import "./SoloProduct.css";

function SoloProduct() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [mainImage, setMainImage] = useState(sadFan);
  const [userList, setUserList] = useState([]);
  const sessionUser = useSelector((state) => state.session.user);
  const product = useSelector((state) => state.product?.product?.product);
  const images = useSelector((state) => state.images?.images);
  const reviews = useSelector((state) => state.reviews?.reviews);

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
      const res = await fetch("/api/users");
      const data = await res.json();
      setUserList(data.users);
    }
    fetchUserData();
  }, []);

  useEffect(() => {
    if (product?.preview_image) {
      setMainImage(product.preview_image);
    } else if (images?.ProductImages?.length > 0) {
      setMainImage(images.ProductImages[0].image_file);
    } else {
      setMainImage(sadFan);
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
    e.preventDefault();
    navigate(`/products/${productId}/reviews/new`);
  };

  const filteredImageArray = images?.ProductImages ? [...images.ProductImages] : [];
  if (product?.preview_image) {
    filteredImageArray.unshift({
      id: "preview",
      image_file: product.preview_image,
      isPreview: true,
    });
  }

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
          {filteredImageArray.map((image, index) => (
            <div key={index} className="sub-image-container">
              <img
                src={image.image_file}
                alt=""
                className={`sub-image-pd ${image.image_file === mainImage ? "selected-image" : ""}`}
                onClick={() => handleImageClick(image)}
              />
              {image.isPreview && <div className="preview-image-label">Preview Image</div>}
            </div>
          ))}
        </div>
      </div>
      <div className="product-details-text">
        <div className="manage-products-buttons">
          {sessionUser && sessionUser.id === product?.owner_id && (
            <button onClick={editProduct} className="modal-buttons">Update Product</button>
          )}
          {sessionUser && sessionUser.id === product?.owner_id && (
            <OpenModalButton
              className="delete-product"
              buttonText="Delete"
              modalComponent={<DeleteProduct productId={productId} />}
            />
          )}
          {sessionUser && sessionUser.id === product?.owner_id && images?.ProductImages?.length < 3 && (
            <OpenModalButton
              className="delete-product"
              buttonText="Add Images"
              modalComponent={<AddProductImage productId={productId} />}
            />
          )}
          {sessionUser && sessionUser.id === product?.owner_id && (
            <OpenModalButton
              className="delete-product"
              buttonText="Delete Images"
              modalComponent={<DeleteProductImage productId={productId} />}
            />
          )}
        </div>

        <h1>{product?.name}</h1>
        <p className="solo-product-price">{product?.price}</p>
        <div>{product?.description}</div>
        <button onClick={cartButton} className="modal-buttons">Add to Cart</button>

        <div className="product-reviews">
          <h2 style={{ textDecoration: "underline" }}>Reviews</h2>
          {sessionUser &&
            sessionUser.id !== product?.owner_id &&
            !reviews?.reviews.find((review) => review.user_id === sessionUser.id) && (
              <button onClick={addReview} className="modal-buttons">Write a Review</button>
            )}
          {!reviews?.reviews.length && <p>Be the first to post a review!</p>}
          {reviews?.reviews &&
            reviews?.reviews.map((review) => {
              const user = userList ? userList.find((user) => user.id == review.user_id) : null;
              return (
                <div className="reviewer-box" key={review.id}>
                  <p className="reviewer-name">{user ? user.username : null}</p>
                  <p>{review?.review}</p>
                  <div className="star-rating">
                    <FaStar id="star" />
                    {review?.star_rating}
                  </div>
                  {sessionUser && review.user_id === sessionUser.id && (
                    <div className="review-edit-delete-buttons">
                      <button onClick={() => navigate(`/products/${productId}/reviews/${review.id}/edit`)} className="modal-buttons">Edit</button>
                      <OpenModalButton
                        buttonText="Delete"
                        modalComponent={<DeleteReview productId={productId} reviewId={review.id} />}
                      />
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
