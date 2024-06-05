import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../context/Modal"
import { deleteImage } from "../../redux/image"
import { allProdImages } from "../../redux/images"
import { soloProduct } from "../../redux/product"
import "./DeleteProductImage.css"

function DeleteProductImage({ productId }) {
  const { closeModal } = useModal()
  const dispatch = useDispatch()
  const [imgArr, setImgArr] = useState([])
  const images = useSelector(state => state.images?.images)

  useEffect(() => {
    dispatch(allProdImages(productId))
  }, [dispatch, productId])

  useEffect(() => {
    dispatch(soloProduct(productId))
  }, [dispatch, productId])

  useEffect(() => {
    if (images?.ProductImages) setImgArr(images?.ProductImages)
  }, [images])

  const deleteButton = async (imgId) => {
    await dispatch(deleteImage(imgId))
    await dispatch(allProdImages(productId))
  }

  return (
    <div className="delete-image-container">
      <h1>Delete Images</h1>
      <p className="delete-image-text">Which image would you like to remove from your product? <span id="note">*Note: Preview images cannot be deleted, so it can be shown on the main page.</span></p>
      <div>
        {imgArr.map(image => (
          <div className="image-deletion-area" key={image.id}>
            <img className="delete-image-thumbnail" src={image?.image_file} alt='product-image' style={{ height: "80px" }} />
            <button onClick={() => deleteButton(image.id)} className=" buttons-extra">Delete</button>
          </div>
        ))}
      </div>
      <button onClick={closeModal} className="modal-buttons">Close</button>
    </div>
  )
}

export default DeleteProductImage
