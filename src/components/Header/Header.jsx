import './Header.css'
import { Link } from 'react-router-dom'
import Nav from '../Nav/Nav.jsx'

export default function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="brand" aria-label="Raíz Urbana, ir al inicio">
          Raíz Urbana
        </Link>
        <Nav />
      </div>
    </header>
  )
}
