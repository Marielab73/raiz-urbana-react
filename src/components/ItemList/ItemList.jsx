import './ItemList.css'
import Item from '../Item/Item.jsx'

export default function ItemList({ productos }) {
  return (
    <div className="grilla">
      {productos.map((producto) => (
        <Item key={producto.id} {...producto} />
      ))}
    </div>
  )
}
