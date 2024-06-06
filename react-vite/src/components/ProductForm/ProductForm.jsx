import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createNewProduct, updateProduct } from '../../redux/product';
import draftQueens from "./draftqueens-longer.png"
import fanSwap from "./fanswap-longer.png"
import './ProductForm.css';

function ProductForm({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState(product ? product?.name : '');
  const [price, setPrice] = useState(product ? product?.price : '');
  const [description, setDescription] = useState(product ? product?.description : '');
  const [previewImage, setPreviewImage] = useState(null);
  const [previewImageUrl, setPreviewImageUrl] = useState(product ? product?.preview_image : '');
  const [categoryId, setCategoryId] = useState(product ? product?.category_id : '');
  const [errors, setErrors] = useState({});
  const [imageLoading, setImageLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    if (!sessionUser) navigate('/products');
    if (product && product.preview_image) {
      setPreviewImageUrl(product.preview_image);
    }
  }, [sessionUser, navigate, product]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(file);
      setPreviewImageUrl(URL.createObjectURL(file));
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category_id', categoryId);

    if (previewImage) {
      formData.append('preview_image', previewImage);
    }

    if (!product) {
      setImageLoading(true);
      const data = await dispatch(createNewProduct(formData));
      setIsLoading(false);

      if (data.errors) {
        console.log(data);
        setErrors(data.errors);
      } else {
        navigate(`/products/${data.id}`);
      }
    } else {
      const data = await dispatch(updateProduct(product.id, formData));
      setIsLoading(false);

      if (data.errors) {
        console.log(data);
        setErrors(data.errors);
      } else {
        navigate(`/products/${data.id}`);
      }
    }
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
      <div className="product-form-container">
        <h2>{product ? 'Edit Product' : 'Create New Product'}</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className='product-form-fields'>
          <label className='product-form-labels'>
            Name:
            <input type="text" value={name} className='addon-inputs product-form-inputs' onChange={(e) => setName(e.target.value)} required />
          </label>
          <div className='error-container'>
            {errors.name && <p className='errors'>{errors.name}</p>}
          </div>

          <label className='product-form-labels'>
            Price:
            <input type="text" value={price} className='addon-inputs product-form-inputs' onChange={(e) => setPrice(e.target.value)} required />
          </label>
          <div className='error-container'>
            {errors.price && <p className='errors'>{errors.price}</p>}
          </div>

          <label className='product-form-labels'>
            Description:
            <textarea value={description} className='product-form-inputs' onChange={(e) => setDescription(e.target.value)} required></textarea>
          </label>
          <div className='error-container'>
            {errors.description && <p className='errors'>{errors.description}</p>}
          </div>

          <label className='product-form-labels'>
            Category:
            <select value={categoryId} className='product-form-inputs' onChange={(e) => setCategoryId(e.target.value)}>
              <option value="">Select a category</option>
              <option value="1">Hats</option>
              <option value="2">Jerseys</option>
              <option value="3">Apparels</option>
            </select>
          </label>
          <div className='error-container'>
            {errors.category_id && <p className='errors'>{errors.category_id}</p>}
          </div>
          <div className='preview-img-big-container'>
            <label className='product-form-labels'>
              Preview Image:
              <p className='accepted-formats'>Accepted formats: .pdf, .png, .jpg, .jpeg, .gif </p>
              <input
                type="file"
                id="file-input"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
              <button
                type="button"
                id="custom-file-button"
                className='custom-file-button'
                onClick={() => document.getElementById('file-input').click()}
              >
                Choose File
              </button>
              <span id="file-name">{fileName}</span>
            </label>
            <div className="preview-image-container">
              {previewImageUrl && (<img src={previewImageUrl} alt="Preview" id='preview-image-upload' />)}
            </div>
          </div>
          <div className='error-container'>
            {errors.preview_image && <p className='errors'>{errors.preview_image}</p>}
          </div>
          <button type="submit" className='modal-buttons'>{product ? 'Update Product' : 'Create Product'}</button>
          {imageLoading && !errors && <p className='loading-message visible'>Loading...</p>}
        </form>
      </div>

      <div className='ads'>
        <img src={fanSwap} alt="" onClick={homePage} />
      </div>
    </div>
  );
}

export default ProductForm;
