"use client";

import Button from "src/components/Button/Button";
import Footer from "src/components/Footer/Footer";
import { usePathname, useRouter } from 'next/navigation'
import Hamburger from 'hamburger-react'
import { AppContext } from "../context/AppContext";
import { useContext, useState } from "react";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
  const page = usePathname()
  const { isMobile } = useContext(AppContext)

  return (
    <>
      <div className="home__container">
        <div className="home__banner-info"></div>
        <div className="home__section">
          <div className="home__header">
            <div className="home__header-col">
              <p className="home__header-logo-text">Audiología MEF</p>
            </div>
            <div className="home__header-col">
              {isMobile ? <div className="header__menu">
                <Hamburger size={25} toggled={menuOpen} toggle={setMenuOpen} color='#2fc4b2' easing="ease-in" rounded label="Show menu" />
              </div>
                : <>
                  <p className="home__header-link" style={{ color: page === '/' ? '#2fc4b2' : '' }} onClick={() => router.push('/')}>Home</p>
                  <p className="home__header-link" style={{ color: page === '/turnos' ? '#2fc4b2' : '' }} onClick={() => router.push('/turnos')}>Turnos</p>
                  <p className="home__header-link" style={{ color: page === '/estudios' ? '#2fc4b2' : '' }} onClick={() => router.push('/#estudios')}>Estudios</p>
                  <p className="home__header-link" style={{ color: page === '/sobre-nosotros' ? '#2fc4b2' : '' }} onClick={() => router.push('/sobre-nosotros')}>Sobre Nosotros</p>
                  <p className="home__header-link" style={{ color: page === '/contacto' ? '#2fc4b2' : '' }} onClick={() => router.push('/contacto')}>Contacto</p>
                </>
              }
            </div>
          </div>
          <div className="home__main-bg">
            <img src="/assets/images/audiologia-mef2.jpg" alt="Audiología MEF" draggable={false} className="home__main-bg-img" />
          </div>
          <p className="home__slogan">Cuidamos tu <strong>audición</strong>, transformamos <br />tu <strong>bienestar</strong>.</p>
        </div>

        <div className="home__studies">
          <div className="home__studies-item">
            <img src="/assets/icons/headphones.svg" alt="" className="home__studies-item-image" />
            <p className="home__studies-item-text">Audiometría Tonal</p>
            <div className="home__studies-item-underline" />
          </div>
          {/* <div className="home__studies-item">
              <img src="/assets/icons/speaking.svg" alt="" className="home__studies-item-image" />
              <p className="home__studies-item-text">Audiometría Vocal</p>
              <div className="home__studies-item-underline" />
            </div> */}
          <div className="home__studies-item">
            <img src="/assets/icons/voice.svg" alt="" className="home__studies-item-image" />
            <p className="home__studies-item-text">Logoaudiometría</p>
            <div className="home__studies-item-underline" />
          </div>
          <div className="home__studies-item">
            <img src="/assets/icons/wind.svg" alt="" className="home__studies-item-image" />
            <p className="home__studies-item-text">Impedanciometría</p>
            <div className="home__studies-item-underline" />
          </div>
          <div className="home__studies-item">
            <img src="/assets/icons/baby.svg" alt="" className="home__studies-item-image" />
            <p className="home__studies-item-text">Potencial Evocado</p>
            <div className="home__studies-item-underline" />
          </div>
        </div>

        <div className="home__section">
          <div className="home__row">
            <div className="home__col">
              <h2 className="home__col-title">¿Por qué elegirnos?</h2>
              <p className="home__text">
                Trabajamos con vos, no solo para vos. Nuestro enfoque colaborativo, atención a los detalles y compromiso con la calidad aseguran que alcances tus objetivos de manera eficaz. Nos esforzamos por ser tu aliado ideal con un servicio confiable y personalizado para tu éxito.
              </p>
              <Button
                label="Agendá un turno ahora"
                bgColor="#6ad1c5"
                textColor="#fff"
                handleClick={() => { }}
                style={{ width: 'fit-content' }}
              />
            </div>
            <div className="home__col">
              <div className="home__side-image-container">
                <img src="/assets/images/otoscopy.jpg" alt="" className="home__side-image" />
              </div>
            </div>
          </div>
        </div>

        <div
          className="home__section"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: isMobile ? 'fit-content' : '',
            margin: isMobile ? '2rem 0 10rem 0' : ''
          }}>
          <div id="estudios" style={{ position: 'absolute', top: 0 }}></div>
          <div className="home__studies-info">
            <div className="home__studies-info-card">
              <div className="home__studies-info-card-image">
                <img src="/assets/icons/headphones.svg" alt="" className="home__studies-info-image" />
              </div>
              <div className="home__studies-info-card-text">
                <h3 className="home__studies-info-card-title">Audiometría Tonal</h3>
                <p className="home__studies-info-card-description">
                  La audiometría tonal evalúa la capacidad auditiva de una persona, determinando su umbral de audición y la tonalidad de los sonidos que puede percibir.
                </p>
              </div>
            </div>
            <div className="home__studies-info-card">
              <div className="home__studies-info-card-image">
                <img src="/assets/icons/voice.svg" alt="" className="home__studies-info-image" />
              </div>
              <div className="home__studies-info-card-text">
                <h3 className="home__studies-info-card-title">Logoaudiometría</h3>
                <p className="home__studies-info-card-description">
                  La logoaudiometría, también conocida como audiometría verbal, es una prueba auditiva que evalúa la capacidad de comprensión del lenguaje hablado.
                </p>
              </div>
            </div>
            <div className="home__studies-info-card">
              <div className="home__studies-info-card-image">
                <img src="/assets/icons/wind.svg" alt="" className="home__studies-info-image" />
              </div>
              <div className="home__studies-info-card-text">
                <h3 className="home__studies-info-card-title">Impedanciometría</h3>
                <p className="home__studies-info-card-description">
                  La impedanciometría evalúa el oído medio frente a sonidos. Es una prueba no invasiva, indolora y precisa que analiza la membrana timpánica y los huesecillos.
                </p>
              </div>
            </div>
            <div className="home__studies-info-card">
              <div className="home__studies-info-card-image">
                <img src="/assets/icons/baby.svg" alt="" className="home__studies-info-image" />
              </div>
              <div className="home__studies-info-card-text">
                <h3 className="home__studies-info-card-title">Potencial Evocado</h3>
                <p className="home__studies-info-card-description">
                  Los potenciales evocados miden la actividad eléctrica cerebral ante estímulos visuales, auditivos o táctiles, evaluando vías sensitivas y detectando lesiones.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="home__section" style={{ background: '#eeeeee' }}>
          <p className="home__subtitle">Testimonios</p>
          <h2 className="home__title">Pacientes satisfechos</h2>
          <div className="home__testimonies">

            <div className="home__testimony">
              <p className="home__testimony-text">
                "Profesional responsable, atenta, cálida; que se ocupa seriamente de sus pacientes."
              </p>
              <div className="home__testimony-user">
                <img src="https://lh3.googleusercontent.com/a-/ALV-UjVJyE0sFtvNDH6eTPCrb87AUwibNo2fOjxco70ReJP4MztMOn_2OQ=w72-h72-p-rp-mo-ba4-br100" alt="" className="home__testimony-img" />
                <div className="home__testimony-info">
                  <p className="home__testimony-name">Angelita</p>
                  <p className="home__testimony-stars">⭐⭐⭐⭐⭐</p>
                </div>
              </div>
            </div>

            <div className="home__testimony">
              <p className="home__testimony-text">
                "Muy amable con los niños . No tuvimos que esperar por el turno, llegamos a nuestro horario y nos atendió."
              </p>
              <div className="home__testimony-user">
                <img src="https://lh3.googleusercontent.com/a-/ALV-UjXP79EqTbzYva9hSivJutiZEeqDZoQg79wl5n8WMnAJaHgeWFh6=w72-h72-p-rp-mo-ba3-br100" alt="" className="home__testimony-img" />
                <div className="home__testimony-info">
                  <p className="home__testimony-name">Eliana</p>
                  <p className="home__testimony-stars">⭐⭐⭐⭐⭐</p>
                </div>
              </div>
            </div>

            <div className="home__testimony">
              <p className="home__testimony-text">
                "Una profesional muy atenta y buena."
              </p>
              <div className="home__testimony-user">
                <img src="https://lh3.googleusercontent.com/a/ACg8ocIwjg7aoO0pImayUE8QnRX0e_sS7KDik-Id3zQc8pmtPYWRhw=w72-h72-p-rp-mo-br100" alt="" className="home__testimony-img" />
                <div className="home__testimony-info">
                  <p className="home__testimony-name">Carlitos</p>
                  <p className="home__testimony-stars">⭐⭐⭐⭐⭐</p>
                </div>
              </div>
            </div>

          </div>
          <a
            className="anchor"
            href="https://www.google.com.ar/maps/place/Fontana+de+Sotelo+Mar%C3%ADa+Elisa/@-31.3851904,-58.0190208,14z/data=!4m8!3m7!1s0x95ade810ca7ee62d:0x1c610cfe96ab7a87!8m2!3d-31.3951852!4d-58.0220005!9m1!1b1!16s%2Fg%2F1tct9x4w"
            target="_blank"
            style={{
              width: '100%',
              textAlign: 'center',
              display: 'block',
              marginTop: '2rem'
            }}
          >
            Ver más
          </a>
        </div>

        <div className="home__section">
          <p className="home__subtitle">Blog</p>
          <h2 className="home__title">Noticias y consejos</h2>
        </div>

        <div className="home__section" style={{ height: 'fit-content' }}>
          <div className="home__studies" style={{ justifyContent: 'space-evenly' }}>
            <div className="home__cta-text">
              <p className="home__cta-text-title">¿Que estas esperando?</p>
              <p className="home__cta-text-subtitle">Contactate con nosotros para sacarte todas tus dudas.</p>
            </div>
            <Button
              label="Contactanos ahora"
              bgColor="#fff"
              textColor="#6ad1c5"
              handleClick={() => router.push('/contacto')}
              style={{
                width: 'fit-content',
                marginRight: !isMobile ? '2rem' : '',
                transform: !isMobile ? 'scale(1.2)' : ''
              }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home;
