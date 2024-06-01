import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { allProdReviews } from "../../redux/reviews";
import ReviewForm from "../ReviewForm";

function EditReview() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId, reviewId } = useParams();
  const fetchReviews = useSelector(state => state.reviews?.reviews?.reviews || []);
  const review = fetchReviews.find(review => review.id === Number(reviewId));

  useEffect(() => {
    if (!review) {
      dispatch(allProdReviews(productId));
    }
  }, [dispatch, review, productId]);

  useEffect(() => {
    if (!review) {
      navigate(`/products/${productId}`);
    }
  }, [review, navigate, productId]);

  return (
    <ReviewForm review={review} />
  );
}

export default EditReview;
