import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'
import { formatearPrecio } from '../../utils/formato.js'
import './ItemDetail.css'

export default function ItemDetail({ producto }) {
  const { addToCart, cart } = useCart()
  const [cantidad, setCantidad] = useState(1)
  const [agregado, setAgregado] = useState(false)

  const enCarrito = cart.find((i) => i.id === producto.id)?.cantidad ?? 0
  const disponible = producto.stock - enCarrito

  const handleAgregar = () => {
    addToCart(producto, cantidad)
    setAgregado(true)
    setCantidad(1)
  }

  const usarFallback = (evento) => {
    if (evento.currentTarget.src !== producto.imagen) evento.currentTarget.src = producto.imagen
  }

  return (
    <article className="detalle">
      <div className="detalle__imagen">
        <img
          className="detalle__foto"
          src={producto.imagenLocal}
          alt={producto.nombre}
          onError={usarFallback}
        />
      </div>

      <div className="detalle__info">
        <Link to="/productos" className="volver">‹ Volver a productos</Link>
        <p className="item__categoria">{producto.categoria}</p>
        <h1>{producto.nombre}</h1>
        <p className="detalle__precio">{formatearPrecio(producto.precio)}</p>
        <p className="detalle__desc">{producto.descripcion}</p>

        {disponible > 0 ? (
          <div className="detalle__compra">
            <div className="cantidad" role="group" aria-label="Cantidad">
              <button type="button" onClick={() => setCantidad((c) => Math.max(1, c - 1))} aria-label="Restar uno">−</button>
              <span aria-live="polite">{cantidad}</span>
              <button type="button" onClick={() => setCantidad((c) => Math.min(disponible, c + 1))} aria-label="Sumar uno">+</button>
            </div>

            <button type="button" className="btn" onClick={handleAgregar}>Agregar al carrito</button>
          </div>
        ) : (
          <p className="estado">Ya tenés todo el stock disponible en tu carrito.</p>
        )}

        {agregado && (
          <p className="detalle__ok" role="status">
            Agregado al carrito. <Link to="/carrito">Ir al carrito</Link>
          </p>
        )}

        <p className="detalle__stock">Stock: {producto.stock} unidades</p>
      </div>
    </article>
  )
}
