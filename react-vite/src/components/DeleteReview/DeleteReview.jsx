import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import './DeleteReview.css';
import { allProdReviews } from '../../redux/reviews';
import { removeReview } from '../../redux/review';
import { soloProduct } from '../../redux/product';

function DeleteReview({ productId, reviewId }) {
  const { closeModal } = useModal()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(removeReview(reviewId))
    await dispatch(soloProduct(productId))
    await dispatch(allProdReviews(productId))
    closeModal()
  }

  return (
    <div>
      <div>
        <h1>Delete your review?</h1>
      </div>
      <div>
        <button onClick={handleSubmit}>YES</button>
        <button onClick={closeModal}>NO</button>
      </div>
    </div>
  )
}

export default DeleteReview
