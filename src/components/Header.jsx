// src/components/Header.js
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { AuthContext } from '../context/AuthContext'  // Import AuthContext

const Header = () => {
  const navigate = useNavigate()
  const { cart } = useContext(CartContext)
  const { logout } = useContext(AuthContext)  // Get logout function from AuthContext

  const handleLogout = () => {
    logout()  // Call logout from context
    navigate('/')  // Redirect to login page
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/home">🛍️ MyStore</Link>
      </div>
      <div className="navbar-links">
        <Link to="/home">Home</Link>
        <div className="cart-link-wrapper">
          <Link to="/cart" className="cart-link">
            Cart
            {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
          </Link>
        </div>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  )
}

export default Header
