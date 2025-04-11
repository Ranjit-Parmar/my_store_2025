import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [token, setToken] = useState(localStorage.getItem('token'))  // Initialize token from localStorage

  // Ensure user is redirected to login page if no token is present on load
  useEffect(() => {
    if (!token) {
      navigate('/') // Redirect to login if no token exists
    }
  }, [token, navigate])

  // Login handler
  const login = async (username, password) => {
    try {
      const res = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      })

      if (!res.ok) {
        const errorText = await res.text()
        throw new Error(`Login failed: ${errorText}`)
      }

      const data = await res.json()

      if (data.token) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
        navigate('/home')
      } else {
        alert('Login failed: Invalid token response')
      }
    } catch (err) {
      console.error('Login error:', err.message)
      alert('Login failed. Please check your username and password.')
    }
  }

  // Logout handler
  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    navigate('/')
  }

  return (
    <AuthContext.Provider value={{ token, isLoggedIn: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
