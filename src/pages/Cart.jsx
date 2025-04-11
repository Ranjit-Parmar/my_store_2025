import { useContext, useState, useEffect } from "react"
import { CartContext } from "../context/CartContext"
import Spinner from "../components/Spinner"

const Cart = () => {
  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext)

  const [showPopup, setShowPopup] = useState(false)
  const [loading, setLoading] = useState(true)

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckout = () => {
    clearCart()
    setShowPopup(true)
    setTimeout(() => setShowPopup(false), 4000)
  }

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <Spinner />

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p className="empty-message">Your cart is empty.</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} />
              <div className="cart-item-info">
                <h4>{item.title}</h4>
                <p>${item.price.toFixed(2)}</p>

                {/* Quantity Controls */}
                <div className="quantity-controls">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    disabled={item.quantity === 1}
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div>
              </div>
              <button
                className="remove-button"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}

          <div className="cart-summary">
            <p><strong>Total:</strong> ${total.toFixed(2)}</p>
            <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
          </div>
        </>
      )}

      {showPopup && <div className="popup">✅ Order placed successfully!</div>}
    </div>
  )
}

export default Cart
