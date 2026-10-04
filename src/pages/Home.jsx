import './Home.css'
import { Link } from 'react-router-dom'
import ItemListContainer from '../components/ItemListContainer/ItemListContainer.jsx'


export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero__texto">
          <h1>Plantas que se adaptan a tu casa.</h1>
          <p>Elegimos especies resistentes, las embalamos con cuidado y te contamos cómo cuidarlas desde el primer riego.</p>
          <Link to="/productos" className="btn">Ver productos</Link>
        </div>
        <div className="hero__arte" aria-hidden="true">
          <img
          src="/img/Janita.png"
          alt="Janita rodeada de plantas"
          className="hero__imagen"
          />
          <p className="hero__homenaje">
            En recuerdo de Janita 🤍
          </p>
        </div>
      </section>

      <section className="seccion">
        <h2>Las más pedidas</h2>
        <ItemListContainer limite={4} />
      </section>
    </>
  )
}
