import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { allProdImages } from '../../redux/images';
import { addImage } from '../../redux/image';
import { useModal } from '../../context/Modal';

function AddProductImage({ productId }) {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [imageLoading, setImageLoading] = useState(false);
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Upload Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
          />
        </div>
        {imagePreview && (
          <div>
            <img src={imagePreview} alt="Image Preview" style={{ maxWidth: '100%', maxHeight: '300px' }} />
          </div>
        )}
        {errors.image && <p>{errors.image}</p>}
        <button type="submit">Upload</button>
        {imageLoading && <p>Loading...</p>}
      </form>
    </div>
  );
};

export default AddProductImage;
