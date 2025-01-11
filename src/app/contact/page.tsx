'use client'

type Props = {}

export default function Contact({ }: Props) {

    return (
        <div className="page__container">
            <h1 className='page__title'>Contactanos</h1>
            <p className='page__text'>¡Nos encantaría saber de vos! Ya sea que tengas una consulta, comentarios o desees programar una cita, no dudes en escribirnos. Estamos aquí para ayudarte a cuidar de tu audición.</p>

            <p className='page__text'>Consultas generales: <a href='mailto:audiologia.mef@gmail.com'>audiologia.mef@gmail.com</a></p>

            {/* <h2 className='page__subtitle'>Encuéntranos en Redes Sociales</h2>
            <div className="contact__social">
                <a target='_blank' href='https://www.linkedin.com/in/audiologia-mef'>
                    <img src='assets/icons/linkedin.svg' alt="LinkedIn" className="contact__social-svg" />
                </a>
                <a target='_blank' href='https://www.instagram.com/audiologia.mef'>
                    <img src='assets/icons/instagram.svg' alt="Instagram" className="contact__social-svg" />
                </a>
            </div> */}
            <p className='page__text' style={{ textAlign: 'center', marginTop: '4rem' }}>Gracias por contactarnos. ¡Estamos listos para ayudarte a mejorar tu salud auditiva!</p>
        </div>

    )
}