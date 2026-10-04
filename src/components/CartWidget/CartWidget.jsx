import './CartWidget.css'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext.jsx'

export default function CartWidget() {
  const { totalItems } = useCart()

  return (
    <Link
      to="/carrito"
      className="cart-widget"
      aria-label={`Carrito, ${totalItems} ${totalItems === 1 ? 'producto' : 'productos'}`}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 4h2.2l2.1 10.2a1.5 1.5 0 0 0 1.5 1.2h7.9a1.5 1.5 0 0 0 1.5-1.1L20 8H6.2" />
        <circle cx="9.5" cy="19.5" r="1.3" />
        <circle cx="17" cy="19.5" r="1.3" />
      </svg>
      <span className="cart-widget__count">{totalItems}</span>
    </Link>
  )
}
