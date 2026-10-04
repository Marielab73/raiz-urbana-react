import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ItemDetail from '../ItemDetail/ItemDetail.jsx'

export default function ItemDetailContainer() {
  const { id } = useParams()
  const [producto, setProducto] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setCargando(true)
    setError(null)

    fetch(`${import.meta.env.BASE_URL}data/productos.json`)
      .then((res) => {
        if (!res.ok) throw new Error('No pudimos cargar el producto.')
        return res.json()
      })
      .then((data) => setProducto(data.find((p) => p.id === Number(id)) ?? null))
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false))
  }, [id])

  if (cargando) return <p className="estado" role="status">Cargando producto…</p>
  if (error) return <p className="estado estado--error">{error}</p>

  if (!producto) {
    return (
      <div className="estado">
        <p>No encontramos ese producto.</p>
        <Link to="/productos" className="btn">Ver todos los productos</Link>
      </div>
    )
  }

  return <ItemDetail producto={producto} />
}
