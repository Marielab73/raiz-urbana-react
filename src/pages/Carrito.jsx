import './Carrito.css'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { formatearPrecio } from '../utils/formato.js'
import { useState } from 'react'


export default function Carrito() {

  const [compraRealizada, setCompraRealizada] = useState(false)

  const {
  cart,
  updateQuantity,
  removeFromCart,
  clearCart,
  totalPrice,
  totalItems,
  checkout
} = useCart()

 const finalizarCompra = () => {
    checkout()
    setCompraRealizada(true)
  }

if (compraRealizada) {
  return (
    <section className="carrito">
      <div className="carrito__exito">
        <h2>Compra realizada con éxito 🎉</h2>
        <p>Gracias por tu compra.</p>

        <Link to="/" className="btn">
          Volver al inicio
        </Link>
      </div>
    </section>
  )
}


  if (cart.length === 0) {
    return (
      <section className="seccion estado">
        <h1>Tu carrito está vacío</h1>
        <p>Sumá una planta desde el catálogo y aparecerá acá.</p>
        <Link to="/productos" className="btn">Ver productos</Link>
      </section>
    )
  }

  return (
    <section className="seccion">
      <h1>Carrito</h1>
      <ul className="carrito">
        {cart.map((item) => (
          <li className="carrito__fila" key={item.id}>
            <Link to={`/producto/${item.id}`} className="carrito__nombre">{item.nombre}</Link>
            <div className="cantidad" role="group" aria-label={`Cantidad de ${item.nombre}`}>
              <button type="button" onClick={() => updateQuantity(item.id, item.cantidad - 1)} aria-label="Restar uno">−</button>
              <span>{item.cantidad}</span>
              <button type="button" onClick={() => updateQuantity(item.id, item.cantidad + 1)} disabled={item.cantidad >= item.stock} aria-label="Sumar uno">+</button>
            </div>
            <span className="carrito__unit">{formatearPrecio(item.precio)} c/u</span>
            <strong className="carrito__subtotal">{formatearPrecio(item.precio * item.cantidad)}</strong>
            <button type="button" className="link-btn" onClick={() => removeFromCart(item.id)}>Quitar</button>
          </li>
        ))}
       </ul>

      <div className="carrito__resumen">
        <p>{totalItems} {totalItems === 1 ? 'producto' : 'productos'}</p>
        <p className="carrito__total">Total: {formatearPrecio(totalPrice)}</p>
        <div className="carrito__acciones">
          <button type="button" className="btn btn--sec" onClick={clearCart}>Vaciar carrito</button>
          <Link to="/productos" className="btn btn--sec">Seguir comprando</Link>
          <button type="button" className="btn btn--sec"  onClick={finalizarCompra}>Finalizar compra </button>
        </div>
      </div>
    </section>
  )
}
