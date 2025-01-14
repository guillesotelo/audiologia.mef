'use client'

import Footer from "src/components/Footer/Footer"
import Header from "src/components/Header/Header"

type Props = {}

export default function Turnos({ }: Props) {

    return (
        <>
            <Header />
            <div className="page__container">
                <h1 className='page__title'>Turnos</h1>
                <p className='page__text'>Completa tu información y elige una fecha para tu próximo turno:</p>
            </div>
            <Footer />
        </>
    )
}