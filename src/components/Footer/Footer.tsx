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
                    <img src="/assets/icons/phone.svg" alt="" className="footer__info-item-img" />
                    <p className="footer__info-item-data"><a className="anchor" style={{ color: 'gray' }} href="tel:+5493454064331">(+549) 345 4064 331</a></p>
                </div>

                <div className="footer__info-item">
                    <img src="/assets/icons/location.svg" alt="" className="footer__info-item-img" />
                    <p className="footer__info-item-data">Aristóbulo del Valle 171</p>
                </div>

                <div className="footer__info-item">
                    <img src="/assets/icons/envelope.svg" alt="" className="footer__info-item-img" />
                    <p className="footer__info-item-data"><a className="anchor" style={{ color: 'gray' }} href="mailto:audiologia-mef@gmail.com">audiologia-mef@gmail.com</a></p>
                </div>
            </div>
            <nav className="footer__nav">
                <a href={`${weblink}/policy`} className="footer__link">Políticas</a>
                <a href={`${weblink}/contact`} className="footer__link">Contacto</a>
                {isLoggedIn ? <p className="footer__link" onClick={logout}>Logout</p>
                    : <a href={`${weblink}/login`} className="footer__link">Login</a>}
            </nav>
        </div>
    )
}