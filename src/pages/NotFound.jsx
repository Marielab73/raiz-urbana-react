import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="seccion estado">
      <h1>Página no encontrada</h1>
      <p>La dirección que abriste no existe.</p>
      <Link to="/" className="btn">Volver al inicio</Link>
    </section>
  )
}
