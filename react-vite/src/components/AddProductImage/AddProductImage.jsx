import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { allProdImages } from '../../redux/images';
import { addImage } from '../../redux/image';
import { useModal } from '../../context/Modal';
import "./AddProductImage.css";

function AddProductImage({ productId }) {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [imageLoading, setImageLoading] = useState(false);
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const validateImage = (file) => {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      return "Invalid file type.";
    }
    return null;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const error = validateImage(file);
    if (error) {
      setErrors({ image: error });
      setImage(null);
      setImagePreview(null);
    } else {
      setErrors({});
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setErrors({ image: "Please select an image to upload." });
      return;
    }
    setImageLoading(true);
    const formData = new FormData();
    formData.append('image_file', image);

    const res = await dispatch(addImage(productId, formData));
    setImageLoading(false);

    if (res.errors) {
      setErrors(res.errors);
    } else {
      setImage(null);
      setImagePreview(null);
      await dispatch(allProdImages(productId));
      closeModal();
    }
  };

  return (
    <div className='add-image-container'>
      <form onSubmit={handleSubmit} className='add-image-form'>
        <div className='file-upload-area'>
          <p>Accepted formats: .pdf, .png, .jpg, .jpeg, .gif </p>
          <input
            type="file"
            onChange={handleImageChange}
          />
        </div>
        <div className='image-preview-add-frame'>
          {imagePreview && (<img src={imagePreview} alt="Image Preview" className='image-preview-add' />)}
        </div>
        <p className={`errors-image ${errors.image ? 'visible' : ''}`}>{errors.image}</p>
        <button type="submit" className='modal-buttons'>Upload</button>
        <p className={`loading-message ${imageLoading ? 'visible' : ''}`}>Loading...</p>
      </form>
    </div>
  );
};

export default AddProductImage;
