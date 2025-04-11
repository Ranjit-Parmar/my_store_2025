import { useParams } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { CartContext } from '../context/CartContext'
import Spinner from '../components/Spinner'

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const { addToCart } = useContext(CartContext)

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(json => setProduct(json))
  }, [id])

  if (!product) return <Spinner/>

  return (
    <div className="product-detail-container">
      <div className="product-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-info">
        <h2>{product.title}</h2>
        <p className="product-description">{product.description}</p>
        <h3 className="product-price">${product.price}</h3>
        <button className="add-to-cart-button" onClick={() => addToCart(product)}>
          Add to Cart 🛒
        </button>
      </div>
    </div>
  )
}

export default ProductDetail
