import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createReviewThunk, editReviewByIdThunk, getReviewByIdThunk } from '../../redux/review';
import './ReviewForm.css'
const ReviewForm = ({ review }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [reviewText, setReviewText] = useState(review ? review[0]?.review : '');
  const [starRating, setStarRating] = useState(review ? review[0]?.star_rating : 1);
  const [errors, setErrors] = useState({});
  const { busId } = useParams()
  const user = useSelector(state => state.session.user);
  const { reviewId } = useParams()

  useEffect(() => {
    if (!user) navigate('/');
  }, [user, navigate]);

  useEffect(() => {
    dispatch(getReviewByIdThunk(reviewId))
  }, [dispatch, reviewId])

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

    if (!validateForm()) return

    const reviewObj = {
      review: reviewText,
      star_rating: starRating
    };

    const data = review ? await dispatch(editReviewByIdThunk(reviewId, reviewObj))
      : await dispatch(createReviewThunk(busId, reviewObj));

    if (data.errors) {
      setErrors(data.errors);
    } else {
      navigate(`/bus/${busId}`)
    }
  };

  return (
    <div className='reviewForm'>
      <h1 className=''>{review ? 'Update your review' : 'Create a review'}</h1>
      <form onSubmit={handleSubmit}>
        <section className='form-section'>
          <h3>{"Your review"}</h3>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder='Write your review here'
          ></textarea>
          {errors.review && <p className="error">{errors.review}</p>}
        </section>
        <section className='form-section-star'>
          <h3>{"Star Rating: "}</h3>
          <div onClick={() => setStarRating(1)} className={starRating > 0 ? 'star active' : 'star'} />
          <div onClick={() => setStarRating(2)} className={starRating > 1 ? 'star active' : 'star'} />
          <div onClick={() => setStarRating(3)} className={starRating > 2 ? 'star active' : 'star'} />
          <div onClick={() => setStarRating(4)} className={starRating > 3 ? 'star active' : 'star'} />
          <div onClick={() => setStarRating(5)} className={starRating > 4 ? 'star active' : 'star'} />
          <input
            type="number"
            id='star-numbers'
            value={starRating}
            onChange={(e) => setStarRating(e.target.value)}
            min="1"
            max="5"
          />

          {errors.star_rating && <p className="error">{errors.star_rating}</p>}
        </section>
        <button type='submit'>
          {review ? `Update Review` : `Create Review`}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
