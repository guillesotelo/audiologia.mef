'use client'

import Footer from "src/components/Footer/Footer"
import Header from "src/components/Header/Header"

type Props = {}

export default function About({ }: Props) {

    return (
        <>
            <Header />
            <div className="page__container">
                <h1 className='page__title'>Sobre nosotros</h1>
                <p className='page__text'>Fonoaudióloga: María Elisa Fontana</p>
            </div>
            <Footer />
        </>
    )
}