import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CartContext = createContext(null)
const STORAGE_KEY = 'raiz-urbana-carrito'


function leerCarritoGuardado() {
  try {
    const guardado = localStorage.getItem(STORAGE_KEY)
    return guardado ? JSON.parse(guardado) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(leerCarritoGuardado)
  const navigate = useNavigate()
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
    } catch {
      /* si el navegador bloquea el storage, el carrito sigue funcionando en memoria */
    }
  }, [cart])

  // Agrega un producto; si ya existe suma la cantidad (sin superar el stock)
  const addToCart = (producto, cantidad = 1) => {
    setCart((prev) => {
      const existente = prev.find((item) => item.id === producto.id)
      if (existente) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: Math.min(item.cantidad + cantidad, producto.stock) }
            : item
        )
      }
      return [...prev, { ...producto, cantidad: Math.min(cantidad, producto.stock) }]
    })

    //alert('Producto agregado al carrito 🛒')
  }

   // Actualiza la cantidad de un producto
  const updateQuantity = (id, cantidad) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, cantidad: Math.min(cantidad, item.stock) } : item
        )
        .filter((item) => item.cantidad > 0)
    )
  }

    // Elimina un producto
  const removeFromCart = (id) => setCart((prev) => prev.filter((item) => item.id !== id))
  const clearCart = () => setCart([])

    // Cantidad total de productos
  const totalItems = useMemo(() => cart.reduce((acc, item) => acc + item.cantidad, 0), [cart])
  
    // Total a pagar
  const totalPrice = useMemo(
    () => cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0),
    [cart]
  )

// Finaliza la compra
  const checkout = () => {
    //alert('Su compra ha sido realizada 🎉')
     clearCart()
    
  }

  // Valores que quedan disponibles para toda la aplicación
  const value = {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
    checkout,
  }

 // const value = { cart, addToCart, updateQuantity, removeFromCart, clearCart, totalItems, totalPrice }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>')
  return ctx
}

