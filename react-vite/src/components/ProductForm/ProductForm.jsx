import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createNewProduct, updateProduct } from '../../redux/product';
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

  return (
    <div className="product-form-container">
      <h2>{product ? 'Edit Product' : 'Create New Product'}</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className='product-form-fields'>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <div className='error-container'>
          {errors.name && <p className='errors'>{errors.name}</p>}
        </div>

        <label>
          Price:
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </label>
        <div className='error-container'>
          {errors.price && <p className='errors'>{errors.price}</p>}
        </div>

        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </label>
        <div className='error-container'>
          {errors.description && <p className='errors'>{errors.description}</p>}
        </div>

        <label>
          Category:
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            <option value="">Select a category</option>
            <option value="1">Hats</option>
            <option value="2">Jerseys</option>
            <option value="3">Apparels</option>
          </select>
        </label>
        <div className='error-container'>
          {errors.category_id && <p className='errors'>{errors.category_id}</p>}
        </div>

        {previewImageUrl && (
          <div className="preview-image-container">
            <img src={previewImageUrl} alt="Preview" id='preview-image-upload' />
          </div>
        )}
        {!product && (
          <>
            <label>
              Preview Image:
              <input type="file" onChange={handleImageChange} />
            </label>
            <div className='error-container'>
              {errors.preview_image && <p className='errors'>{errors.preview_image}</p>}
            </div>
          </>
        )}
        <button type="submit">{product ? 'Update Product' : 'Create Product'}</button>
        {imageLoading && !errors && <p>Loading...</p>}
      </form>
    </div>
  );
}

export default ProductForm;
