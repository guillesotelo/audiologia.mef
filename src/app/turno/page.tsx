'use client'

import { useContext, useEffect, useState } from "react"
import { dataObj } from "../types"
import { useRouter, useSearchParams } from "next/navigation"
import { cancelBooking, getBookingById } from "src/services"
import Footer from "src/components/Footer/Footer"
import Header from "src/components/Header/Header"
import { getDate } from "src/helpers"
import { studies } from "src/constants"
import Button from "src/components/Button/Button"
import { AppContext } from "../context/AppContext"
import Modal from "src/components/Modal/Modal"
import toast from "react-hot-toast"

export default function Turno() {
    const [booking, setBooking] = useState<dataObj | null>(null)
    const [loading, setLoading] = useState(false)
    const [removeBooking, setRemoveBooking] = useState(false)
    const { isMobile } = useContext(AppContext)
    const params = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        const bookingId = params.get('id')
        if (bookingId) getBooking(bookingId)
    }, [])

    const getBooking = async (id: string) => {
        try {
            setLoading(true)
            const found = await getBookingById(id)
            if (found && found._id) {
                const cancellable = new Date(found.date).getTime() - new Date().getTime() > 864000000
                setBooking({ ...found, cancellable })
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error(error)
        }
    }

    const openCalendarTab = () => {
        const a = document.createElement('a')
        a.style.display = 'none'
        a.target = '_blank'
        a.href = booking?.calendarLink
        a.click()
    }

    const cancelAndRemoveBooking = async () => {
        try {
            if (booking) {
                setLoading(true)
                const removed = await cancelBooking(booking)
                if (removed) {
                    toast.success('¡Turno cancelado!')
                    setTimeout(() => router.push('/'), 2000)
                } else {
                    toast.error('Ha ocurrido un error. Intenta nuevamente.')
                }
                setLoading(false)
            }
        } catch (error) {
            toast.error('Ha ocurrido un error. Intenta nuevamente.')
            setLoading(false)
            console.error(error)
        }
    }

    return (
        <>
            <Header />
            {removeBooking ?
                <Modal title='¿Confirmar cancelación?' onClose={() => setRemoveBooking(false)}>
                    <p>Si confirmás, tu turno será cancelado y eliminado. <br />En el caso de necesitar agendar otro, deberás <a href="https://audiologia-mef.vercel.app/turnos">registrarlo nuevamente</a>.</p>
                    <div className="booking__form-btns">
                        <Button
                            label="Cancelar"
                            handleClick={() => setRemoveBooking(false)}
                            bgColor="gray"
                            textColor="#fff"
                        />
                        <Button
                            label="Confirmar y eliminar"
                            handleClick={cancelAndRemoveBooking}
                            bgColor="#fff"
                            textColor="#FF0000"
                            loading={loading}
                            outline
                        />
                    </div>
                </Modal>
                : ''}
            <div className="page__container">
                <h1 className="page__title">Detalles del turno</h1>
                {booking ?
                    <div className="booking__voucher" style={{ width: isMobile ? '100%' : '30rem' }}>
                        <div className="booking__voucher-details">
                            <p className="booking__voucher-text">
                                <strong>Estudio: </strong>{booking.studyName}
                            </p>
                            <p className="booking__voucher-text">
                                <strong>Cuándo: </strong>{booking.date ? getDate(booking.date) : 'no registrado'}
                            </p>
                            <p className="booking__voucher-text">
                                <strong>Duración: </strong>{studies.find(s => s.value === booking.studyId)?.duration || 30} minutos
                            </p>
                            <p className="booking__voucher-text">
                                <strong>Dirección: </strong> <a href="https://maps.app.goo.gl/tSx7kDDXE993Gvyh6" target="_blank">Aristóbulo del Valle 171, Concordia, ER</a>
                            </p>
                            ---
                            <p className="booking__voucher-text">
                                <strong>Nombre completo: </strong>{booking.firstName} {booking.lastName}
                            </p>
                            <p className="booking__voucher-text">
                                <strong>Fecha de nacimiento: </strong>{getDate(new Date(booking.ageYear, booking.ageMonth, booking.ageDay), false)}
                            </p>
                            <p className="booking__voucher-text">
                                <strong>Email: </strong>{booking.email || 'No registrado'}
                            </p>
                            <p className="booking__voucher-text">
                                <strong>Teléfono: </strong>{booking.phone || 'No registrado'}
                            </p>
                            ---
                            <p className="booking__voucher-text">
                                <strong>Turno creado: </strong>{getDate(booking.createdAt)}
                            </p>
                        </div>
                        {booking.cancellable ?
                            <>
                                <Button
                                    label="Agregar a Google Calendar"
                                    handleClick={openCalendarTab}
                                    bgColor="#6ad1c5"
                                    textColor="#fff"
                                    style={{ margin: '1rem', width: '-webkit-fill-available' }}
                                />
                                <Button
                                    label="Cancelar turno"
                                    handleClick={() => setRemoveBooking(true)}
                                    bgColor="#fff"
                                    textColor="#FF0000"
                                    loading={loading}
                                    outline
                                />
                            </>
                            :
                            <div className="booking__voucher-details">
                                <p className="booking__voucher-text" style={{ color: '#990000' }}>
                                    <strong>Turno caducado o en curso. No se puede modificar ni cancelar.</strong>
                                </p>
                                <p className="booking__voucher-text">
                                    Si necesitas dar un aviso urgente, <a href="https://audiologia-mef.vercel.app/contacto">comunicate con nosotros</a>.
                                </p>
                            </div>
                        }
                    </div>
                    : loading ? 'Cargando datos...'
                        : 'Turno inexistente o inactivo'
                }
            </div>
            <Footer />
        </>
    )
}