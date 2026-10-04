import './Footer.css'

const equipo = [
  { nombre: 'Jana Smith', rol: 'Desarrollo frontend', email: 'jana@raizurbana.com' },
  { nombre: 'Juan Tylor', rol: 'Diseño y UX', email: 'juan@raizurbana.com' },
  { nombre: 'Robert Chan', rol: 'Atención al cliente', email: 'robert@raizurbana.com' },
]

function iniciales(nombre) {
  return nombre
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <section className="footer__empresa">
          <h2 className="footer__titulo">Raíz Urbana</h2>
          <p>Vivero online de plantas de interior, cactus y suculentas. Enviamos con embalaje protegido a todo el país.</p>
          <address>
            Av. Corrientes 1234, Buenos Aires<br />
            Lunes a sábados de 9 a 18 hs<br />
            hola@raizurbana.com · +54 11 5555-0123
          </address>
        </section>

        <section aria-labelledby="equipo-titulo">
          <h2 className="footer__titulo" id="equipo-titulo">Nuestro equipo</h2>
          <ul className="equipo">
            {equipo.map((persona, i) => (
              <li className="equipo__card" key={i}>
                <span className="equipo__avatar" aria-hidden="true">{iniciales(persona.nombre)}</span>
                <span className="equipo__datos">
                  <strong>{persona.nombre}</strong>
                  <span>{persona.rol}</span>
                  <a href={`mailto:${persona.email}`}>{persona.email}</a>
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <p className="footer__legal">© {new Date().getFullYear()} Raíz Urbana. Proyecto de pre-entrega.</p>
    </footer>
  )
}
