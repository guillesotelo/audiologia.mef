"use client"

import { useContext } from "react"
import { AppContext } from "../../app/context/AppContext"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { logOut } from "src/services"

type Props = {}

export default function Footer({ }: Props) {
    const weblink = process.env.NODE_ENV === 'production' ? 'https://audiologia-mef.vercel.app' : 'http://localhost:3000'
    const { isLoggedIn, setIsLoggedIn } = useContext(AppContext)
    const router = useRouter()

    const logout = async () => {
        await logOut()
        localStorage.removeItem('user')
        setIsLoggedIn(false)
        toast.success('See you later!')
        router.push('/')
    }

    return (
        <div className="footer__container">
            <div className="footer__info">
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
            <nav className="footer__nav">
                <a href={`${weblink}/politicas`} className="footer__link">Políticas</a>
                <a href={`${weblink}/contacto`} className="footer__link">Contacto</a>
                {isLoggedIn ? <p className="footer__link" onClick={logout}>Logout</p>
                    : <a href={`${weblink}/login`} className="footer__link">Login</a>}
            </nav>
        </div>
    )
}