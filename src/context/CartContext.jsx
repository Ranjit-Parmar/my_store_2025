import { createContext, useState, useEffect } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (item) => {
    setCart(prev => {
      const exists = prev.find(p => p.id === item.id)
      if (exists) {
        return prev.map(p => p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p)
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(p => p.id !== id))
  }

  const increaseQuantity = (id) => {
    setCart(prev =>
      prev.map(p => p.id === id ? { ...p, quantity: p.quantity + 1 } : p)
    )
  }

  const decreaseQuantity = (id) => {
    setCart(prev =>
      prev
        .map(p => p.id === id ? { ...p, quantity: p.quantity - 1 } : p)
        .filter(p => p.quantity > 0)
    )
  }

  const clearCart = () => setCart([])

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      increaseQuantity,
      decreaseQuantity
    }}>
      {children}
    </CartContext.Provider>
  )
}
