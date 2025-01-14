'use client'

import Footer from "src/components/Footer/Footer"
import Header from "src/components/Header/Header"

type Props = {}

export default function PotencialEvocado({ }: Props) {

    return (
        <>
            <Header />
            <div className="page__container">
                <h1 className='page__title'>Potencial Evocado</h1>
                <p className='page__text'></p>
            </div>
            <Footer />
        </>
    )
}