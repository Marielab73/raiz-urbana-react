import { Link } from 'react-router-dom'
import { formatearPrecio } from '../../utils/formato.js'
import './Item.css'

// Componente reutilizable: recibe los datos del producto por props
export default function Item({ id, nombre, categoria, precio, imagenLocal, imagen }) {
  const usarFallback = (evento) => {
    if (evento.currentTarget.src !== imagen) evento.currentTarget.src = imagen
  }

  return (
    <article className="item">
      <Link to={`/producto/${id}`} className="item__link">
        <div className="item__imagen">
          <img
            className="item__foto"
            src={imagenLocal}
            alt={nombre}
            loading="lazy"
            onError={usarFallback}
          />
        </div>
        <div className="item__info">
          <p className="item__categoria">{categoria}</p>
          <h3 className="item__nombre">{nombre}</h3>
          <p className="item__precio">{formatearPrecio(precio)}</p>
        </div>
      </Link>
    </article>
  )
}
