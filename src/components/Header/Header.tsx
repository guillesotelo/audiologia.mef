'use client'

import { usePathname, useRouter } from "next/navigation"
import Hamburger from 'hamburger-react'
import { useContext, useEffect, useState } from "react"
import { AppContext } from "src/app/context/AppContext"

export default function Header() {
   const [menuOpen, setMenuOpen] = useState(false)
   const [scrolled, setScrolled] = useState(false)
   const color = '#000'
   const router = useRouter()
   const page = usePathname()
   const { isMobile } = useContext(AppContext)

   useEffect(() => {
      const onScroll = (e: any) => {
         const height = e.target.scrollTop
         if (height > 50) setScrolled(true)
         else setScrolled(false)
      }
      document.body.addEventListener('scroll', onScroll)
      return () => document.body.removeEventListener('scroll', onScroll)
   }, [document.body])

   return <div className={`home__header${scrolled ? '--scrolled' : ''}`}>
      <div className="home__header-col">
         <p className="home__header-logo-text" onClick={() => router.push('/')} style={{ color: scrolled ? '#fff' : color || '' }}>Audiología MEF</p>
      </div>
      <div className="home__header-col">
         {isMobile ? <div className="header__menu">
            <Hamburger size={25} toggled={menuOpen} toggle={setMenuOpen} color='#2fc4b2' easing="ease-in" rounded label="Show menu" />
            <div className={`header__menu-sidebar${menuOpen ? '--toggled' : ''}`}>
               <p
                  className="header__menu-sidebar-item"
                  style={{
                     opacity: page === '/' && !window.location.hash ? 1 : '',
                     color: page === '/' ? '#2fc4b2' : ''
                  }}
                  onClick={() => {
                     router.push('/')
                     setMenuOpen(false)
                  }}
               >Home</p>
               <p
                  className="header__menu-sidebar-item"
                  style={{
                     opacity: page === '/turnos' ? 1 : '',
                     color: page === '/turnos' ? '#2fc4b2' : ''
                  }}
                  onClick={() => {
                     router.push('/turnos')
                     setMenuOpen(false)
                  }}                  >Turnos</p>
               <p
                  className="header__menu-sidebar-item"
                  style={{
                     opacity: page === '/' && window.location.hash === '#estudios' ? 1 : '',
                     color: page === '/estudios' ? '#2fc4b2' : ''
                  }}
                  onClick={() => {
                     router.push('/#estudios')
                     setMenuOpen(false)
                  }}                  >Estudios</p>
               <p
                  className="header__menu-sidebar-item"
                  style={{
                     opacity: page === '/sobre-nosotros' ? 1 : '',
                     color: page === '/sobre-nosotros' ? '#2fc4b2' : ''
                  }}
                  onClick={() => {
                     router.push('/sobre-nosotros')
                     setMenuOpen(false)
                  }}                  >Sobre Nosotros</p>
               <p
                  className="header__menu-sidebar-item"
                  style={{
                     opacity: page === '/contacto' ? 1 : '',
                     color: page === '/contacto' ? '#2fc4b2' : ''
                  }}
                  onClick={() => {
                     router.push('/contacto')
                     setMenuOpen(false)
                  }}                  >Contacto</p>
            </div>
         </div>
            : <>
               <p
                  className="home__header-link"
                  style={{
                     color: page === '/' && !window.location.hash ? '#2fc4b2' : scrolled ? '#fff' : 'black'
                  }} onClick={() => router.push('/')}
               >Home</p>
               <p
                  className="home__header-link"
                  style={{
                     color: page === '/turnos' ? '#2fc4b2' : scrolled ? '#fff' : 'black'
                  }}
                  onClick={() => router.push('/turnos')}
               >Turnos</p>
               <p
                  className="home__header-link"
                  style={{
                     color: page === '/' && window.location.hash === '#estudios' ? '#2fc4b2' : scrolled ? '#fff' : 'black'
                  }}
                  onClick={() => router.push('/#estudios')}
               >Estudios</p>
               <p
                  className="home__header-link"
                  style={{
                     color: page === '/sobre-nosotros' ? '#2fc4b2' : scrolled ? '#fff' : 'black'
                  }}
                  onClick={() => router.push('/sobre-nosotros')}
               >Sobre Nosotros</p>
               <p
                  className="home__header-link"
                  style={{
                     color: page === '/contacto' ? '#2fc4b2' : scrolled ? '#fff' : 'black'
                  }}
                  onClick={() => router.push('/contacto')}
               >Contacto</p>
            </>
         }
      </div>
   </div>
}