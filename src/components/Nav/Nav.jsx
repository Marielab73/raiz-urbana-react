import './Nav.css'
import { Link } from 'react-router-dom'
import CartWidget from '../CartWidget/CartWidget.jsx'

export default function Nav() {
  return (
    <nav className="nav" aria-label="Navegación principal">
      <Link to="/" className="nav__link">Inicio</Link>
      <Link to="/productos" className="nav__link">Productos</Link>
      <CartWidget />
    </nav>
  )
}
