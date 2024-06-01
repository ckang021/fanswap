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
    <div id='delete-business-container'>
      <h1 className='title'>Delete this Product?</h1>
      <div className='buttons-container'>
        <button className='yes-no-btn' onClick={handleSubmit}>YES</button>
        <button className='yes-no-btn' onClick={closeModal}>NO</button>
      </div>
    </div>
  )
}


export default DeleteProduct
