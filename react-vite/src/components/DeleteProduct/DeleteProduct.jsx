import { useModal } from '../../context/Modal';
import { useDispatch, } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeProduct } from '../../redux/product';
import './DeleteProduct.css';


function DeleteProduct({ productId }) {
  const { closeModal } = useModal()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = async () => {
    await dispatch(removeProduct(productId))
    navigate('/products/my-products')
    closeModal()
  }

  return (
    <div className='delete-product-container'>
      <h1>Delete this Product?</h1>
      <div className='delete-product-buttons'>
        <button onClick={handleSubmit} className='modal-buttons'>YES</button>
        <button onClick={closeModal} className='modal-buttons'>NO</button>
      </div>
    </div>
  )
}


export default DeleteProduct
