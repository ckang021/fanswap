import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addReview, updateReview } from '../../redux/review';
import { FaStar } from 'react-icons/fa';
import draftQueens from "./draftqueens-longer.png"
import fanSwap from "./fanswap-longer.png"
import './ReviewForm.css';

const ReviewForm = ({ review }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId, reviewId } = useParams();
  const user = useSelector(state => state.session.user);

  const [reviewText, setReviewText] = useState(review ? review.review : '');
  const [starRating, setStarRating] = useState(review ? review.star_rating : 1);
  const [activeRating, setActiveRating] = useState(review ? review.star_rating : 0);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!user) navigate('/');
  }, [user, navigate]);

  const validateForm = () => {
    const newErrors = {};

    if (!reviewText.trim()) newErrors.review = "Description is required";
    if (!starRating) newErrors.star_rating = "Rating is required";
    if (starRating < 1 || starRating > 5) newErrors.star_rating = "Rating must be between 1 and 5";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const reviewObj = {
      review: reviewText,
      star_rating: starRating
    };

    const data = review ? await dispatch(updateReview(reviewId, reviewObj))
      : await dispatch(addReview(productId, reviewObj));

    if (data.errors) {
      setErrors(data.errors);
    } else {
      navigate(`/products/${productId}`);
    }
  };

  const handleClick = (num) => {
    setActiveRating(num);
    setStarRating(num);
  };

  const homePage = (e) => {
    e.preventDefault()
    navigate("/products")
  }

  return (
    <div className='great-div'>
      <div className='ads'>
        <a href="https://draft-queens.onrender.com/" target='_blank'>
          <img src={draftQueens} alt="" />
        </a>
      </div>
      <div className='review-form-container'>
        <h1>{review ? 'Update your review' : 'Create a review'}</h1>
        <form onSubmit={handleSubmit} className='review-form'>
          <section className='form-section'>
            <h3>Your review:</h3>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder='Write your review here'
              className='text-area-review'
            ></textarea>
            {errors.review && <p className="error">{errors.review}</p>}
          </section>
          <section className='review-star-section'>
            <h3>Star Rating:</h3>
            <div className="stars">
              <FaStar
                size={20}
                color={activeRating >= 1 ? "gold" : "rgb(75, 75, 75)"}
                onClick={() => handleClick(1)}
                onMouseEnter={() => setActiveRating(1)}
                onMouseLeave={() => setActiveRating(starRating)}
                className={activeRating >= 1 ? "star active" : "star"}
              />
              <FaStar
                size={20}
                color={activeRating >= 2 ? "gold" : "rgb(75, 75, 75)"}
                onClick={() => handleClick(2)}
                onMouseEnter={() => setActiveRating(2)}
                onMouseLeave={() => setActiveRating(starRating)}
                className={activeRating >= 2 ? "star active" : "star"}
              />
              <FaStar
                size={20}
                color={activeRating >= 3 ? "gold" : "rgb(75, 75, 75)"}
                onClick={() => handleClick(3)}
                onMouseEnter={() => setActiveRating(3)}
                onMouseLeave={() => setActiveRating(starRating)}
                className={activeRating >= 3 ? "star active" : "star"}
              />
              <FaStar
                size={20}
                color={activeRating >= 4 ? "gold" : "rgb(75, 75, 75)"}
                onClick={() => handleClick(4)}
                onMouseEnter={() => setActiveRating(4)}
                onMouseLeave={() => setActiveRating(starRating)}
                className={activeRating >= 4 ? "star active" : "star"}
              />
              <FaStar
                size={20}
                color={activeRating >= 5 ? "gold" : "rgb(75, 75, 75)"}
                onClick={() => handleClick(5)}
                onMouseEnter={() => setActiveRating(5)}
                onMouseLeave={() => setActiveRating(starRating)}
                className={activeRating >= 5 ? "star active" : "star"}
              />
            </div>
            <input
              type="number"
              id='star-numbers'
              value={starRating}
              onChange={(e) => setStarRating(Number(e.target.value))}
              min="1"
              max="5"
            />
            {errors.star_rating && <p className="error">{errors.star_rating}</p>}
          </section>
          <button type='submit' className='modal-buttons'>
            {review ? 'Update Review' : 'Create Review'}
          </button>
        </form>
      </div>

      <div className='ads'>
        <img src={fanSwap} alt="" onClick={homePage} />
      </div>
    </div>

  );
};

export default ReviewForm;
