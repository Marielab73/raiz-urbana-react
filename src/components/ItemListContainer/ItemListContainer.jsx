import './ItemListContainer.css'
import { useEffect, useState } from 'react'
import ItemList from '../ItemList/ItemList.jsx'

export default function ItemListContainer({ limite }) {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [categoria, setCategoria] = useState('Todas')

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/productos.json`)
      .then((res) => {
        if (!res.ok) throw new Error('No pudimos cargar el catálogo.')
        return res.json()
      })
      .then((data) => setProductos(data))
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false))
  }, [])

  if (cargando) return <p className="estado" role="status">Cargando productos…</p>
  if (error) return <p className="estado estado--error">{error} Recargá la página para intentarlo de nuevo.</p>

  const categorias = ['Todas', ...new Set(productos.map((p) => p.categoria))]
  const filtrados = productos.filter((p) => categoria === 'Todas' || p.categoria === categoria)
  const visibles = limite ? filtrados.slice(0, limite) : filtrados

  return (
    <div>
      {!limite && (
        <div className="filtros" role="group" aria-label="Filtrar por categoría">
          {categorias.map((c) => (
            <button
              key={c}
              type="button"
              className={c === categoria ? 'filtro filtro--activo' : 'filtro'}
              aria-pressed={c === categoria}
              onClick={() => setCategoria(c)}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <ItemList productos={visibles} />
    </div>
  )
}
