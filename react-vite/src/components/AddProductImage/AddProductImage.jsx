import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addImage } from '../../redux/image';
import { allProdImages } from '../../redux/images';
import { useModal } from '../../context/Modal';
import { useNavigate } from 'react-router-dom';


function AddProductImage({ productId }) {
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [imageLoading, setImageLoading] = useState(false);
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
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
      await dispatch(allProdImages(productId))
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
        {errors.image && <p>{errors.image}</p>}
        <button type="submit">Upload</button>
        {imageLoading && <p>Loading...</p>}
      </form>
    </div>
  );
};

export default AddProductImage;
