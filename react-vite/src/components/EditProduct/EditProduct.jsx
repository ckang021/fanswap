import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { soloProduct } from "../../redux/product"
import ProductForm from "../ProductForm/ProductForm"

function EditProduct() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const product = useSelector(state => state.product?.product?.product)
  // console.log(product)

  useEffect(() => {
    if (!product || product.id !== Number(productId)) {
      dispatch(soloProduct(productId));
    }
  }, [dispatch, productId, product]);

  useEffect(() => {
    if (!product) {
      navigate(`/products/${productId}`)
    }
  })

  return (
    <ProductForm product={product} />
  )
}

export default EditProduct
