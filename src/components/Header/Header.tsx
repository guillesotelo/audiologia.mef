'use client'

import { usePathname, useRouter } from "next/navigation"
import Hamburger from 'hamburger-react'
import { useContext, useState } from "react"
import { AppContext } from "src/app/context/AppContext"

export default function Header() {
   const [menuOpen, setMenuOpen] = useState(false)
   const color = '#000'
   const router = useRouter()
   const page = usePathname()
   const { isMobile } = useContext(AppContext)

   return <div className="home__header" style={{ position: 'relative' }}>
      <div className="home__header-col">
         <p className="home__header-logo-text" onClick={() => router.push('/')} style={{ color: color || '' }}>Audiología MEF</p>
      </div>
      <div className="home__header-col">
         {isMobile ? <div className="header__menu">
            <Hamburger size={25} toggled={menuOpen} toggle={setMenuOpen} color='#2fc4b2' easing="ease-in" rounded label="Show menu" />
         </div>
            : <>
               <p className="home__header-link" style={{ opacity: page === '/' ? 1 : '', color: page === '/' ? '#2fc4b2' : color }} onClick={() => router.push('/')}>Home</p>
               <p className="home__header-link" style={{ opacity: page === '/turnos' ? 1 : '', color: page === '/turnos' ? '#2fc4b2' : color }} onClick={() => router.push('/turnos')}>Turnos</p>
               <p className="home__header-link" style={{ opacity: page === '/estudios' ? 1 : '', color: page === '/estudios' ? '#2fc4b2' : color }} onClick={() => router.push('/#estudios')}>Estudios</p>
               <p className="home__header-link" style={{ opacity: page === '/sobre-nosotros' ? 1 : '', color: page === '/sobre-nosotros' ? '#2fc4b2' : color }} onClick={() => router.push('/sobre-nosotros')}>Sobre Nosotros</p>
               <p className="home__header-link" style={{ opacity: page === '/contacto' ? 1 : '', color: page === '/contacto' ? '#2fc4b2' : color }} onClick={() => router.push('/contacto')}>Contacto</p>
            </>
         }
      </div>
   </div>
}