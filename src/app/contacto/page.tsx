'use client'

import Footer from "src/components/Footer/Footer"
import Header from "src/components/Header/Header"

type Props = {}

export default function Contact({ }: Props) {

    return (
        <>
            <Header />
            <div className="page__container">
                <h1 className='page__title'>Contactanos</h1>
                <p className='page__text'>¡Nos encantaría saber de vos! Ya sea que tengas una consulta, comentarios o desees programar un turno directamente con nosotros, no dudes en escribirnos. Estamos acá para ayudarte a cuidar de tu audición.</p>
                <div className="footer__info" style={{ marginTop: '4rem' }}>
                    <div className="footer__info-item">
                        <a className="anchor" style={{ color: 'gray' }} href="https://wa.me/+5493454064331?text=Hola%2C%20visit%C3%A9%20el%20sitio%20de%20Audiolog%C3%ADa%20MEF%20y%20me%20gustar%C3%ADa%20conocer%20m%C3%A1s%20sobre%20los%20estudios">
                            <img src="/assets/icons/phone.svg" alt="" className="footer__info-item-img" />
                            <p className="footer__info-item-data">(+549) 345 4064 331</p>
                        </a>
                    </div>

                    <div className="footer__info-item">
                        <a className="anchor" style={{ color: 'gray' }} href="https://maps.app.goo.gl/xTx7aLEJG1CBfKK4A" target="_blank">
                            <img src="/assets/icons/location.svg" alt="" className="footer__info-item-img" />
                            <p className="footer__info-item-data">Aristóbulo del Valle 171, Concordia</p>
                        </a>
                    </div>

                    <div className="footer__info-item">
                        <a className="anchor" style={{ color: 'gray' }} href="mailto:audiologia.mef@gmail.com">
                            <img src="/assets/icons/envelope.svg" alt="" className="footer__info-item-img" />
                            <p className="footer__info-item-data">audiologia.mef@gmail.com</p>
                        </a>
                    </div>
                </div>
                <p className='page__text' style={{ textAlign: 'center', marginTop: '4rem' }}>Gracias por contactarnos. ¡Estamos listos para ayudarte a mejorar tu salud auditiva!</p>
            </div>
        </>
    )
}