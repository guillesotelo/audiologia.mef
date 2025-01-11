'use client'

import { useContext } from "react"
import { AppContext } from "src/app/context/AppContext"

export default function Header() {
   const { page, setPage } = useContext(AppContext)
   const color = '#000'

   return <div className="home__header" style={{ position: 'relative' }}>
      <div className="home__header-col">
         <p className="home__header-logo-text" style={{ color: color || '' }}>Audiología MEF</p>
      </div>
      <div className="home__header-col">
         <p className="home__header-link" style={{ color: page === 'Home' ? '#2fc4b2' : color || '' }} onClick={() => setPage('Home')}>Home</p>
         <p className="home__header-link" style={{ color: page === 'Turnos' ? '#2fc4b2' : color || '' }} onClick={() => setPage('Turnos')}>Turnos</p>
         <p className="home__header-link" style={{ color: page === 'Estudios' ? '#2fc4b2' : color || '' }} onClick={() => setPage('Estudios')}>Estudios</p>
         <p className="home__header-link" style={{ color: page === 'Sobre Nosotros' ? '#2fc4b2' : color || '' }} onClick={() => setPage('Sobre Nosotros')}>Sobre Nosotros</p>
         <p className="home__header-link" style={{ color: page === 'Contacto' ? '#2fc4b2' : color || '' }} onClick={() => setPage('Contacto')}>Contacto</p>
      </div>
   </div>
}