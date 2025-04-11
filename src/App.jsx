import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Cart from './pages/Cart'
import ProductDetail from './pages/ProductDetail'
import Header from './components/Header'
import NotFound from './components/NotFound'

function App() {
  const { isLoggedIn } = useContext(AuthContext)
  const location = useLocation()

  // Check if current path is NOT the login page
  const shouldShowHeader = location.pathname !== '/'

  return (
    <>
      {shouldShowHeader && <Header />}

      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate to="/" />}
        />
        <Route
          path="/cart"
          element={isLoggedIn ? <Cart /> : <Navigate to="/" />}
        />
        <Route
          path="/product/:id"
          element={isLoggedIn ? <ProductDetail /> : <Navigate to="/" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
