'use client'

import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import Button from "src/components/Button/Button"
import Dropdown from "src/components/Dropdown/Dropdown"
import Footer from "src/components/Footer/Footer"
import Header from "src/components/Header/Header"
import InputField from "src/components/InputField/InputField"
import Calendar from 'react-calendar'
import { TileDisabledFunc } from 'react-calendar/dist/cjs/shared/types'
import QRCode from "react-qr-code"
import { createBooking } from "src/services"

type Props = {}

const voidStudy = { value: '', label: '', duration: 0 }
const voidData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    qr: ''
}
const web = `https://audiologia-mef.vercel.app/`

export default function Turnos({ }: Props) {
    const [data, setData] = useState(voidData)
    const [date, setDate] = useState<any>(null)
    const [endDate, setEndDate] = useState<any>(null)
    const [timeOptions, setTimeOptions] = useState([])
    const [openCalendar, setOpenCalendar] = useState(false)
    const [selectedStudy, setSelectedStudy] = useState(voidStudy)
    const [selectedTime, setSelectedTime] = useState(null)
    const [calendarLink, setCalendarLink] = useState('')
    const [booked, setBooked] = useState(false)
    const [loading, setLoading] = useState(false)
    const [qr, setQr] = useState('')

    useEffect(() => {
        setTimeOptions([])
    }, [])

    useEffect(() => {
        if (data.firstName && data.lastName && (data.phone || data.email) && date) {
            const start = date.toISOString().replace(/[^\w\s]/gi, '')
            const end = endDate ? endDate.toISOString().replace(/[^\w\s]/gi, '') : start
            const details = `Audiolog%C3%ADa+MEF+-+${selectedStudy.label}%0D%0A%0D%0AProfesional%3A+Lic.+Mar%C3%ADa+Elisa+Fontana%0D%0ADirecci%C3%B3n%3A+A.+del+Valle+171%2C+Concordia%2C+ER%0D%0ATel%3A+%280345%29+422-2639%0D%0A%0D%0ASi+desea+cancelar+el+turno+o+no+puede+asistir%2C+debe+informarlo+al+menos+24+horas+antes+de+la+hora+de+comienzo.%0D%0A%0D%0AGracias+y+nos+vemos+pronto%21`

            setCalendarLink(`https://calendar.google.com/calendar/u/0/r/eventedit?text=${selectedStudy.label.replace(' ', '+')}&details=${details}&dates=${start}/${end}`)
            setQr(`turno?name=${data.firstName}&lastName=${data.lastName}&phone=${data.phone}&email=${data.email}&date=${date.getTime()}`)
        } else setQr('')
    }, [data, date])

    const updateData = (key: string, e: any) => {
        const { value } = e.target
        setData(prev => ({ ...prev, [key]: value }))
    }

    const studies = [
        { value: 'audiometria', label: 'Audiometría', duration: 1 },
        { value: 'logoaudiometria', label: 'Logoaudiometría', duration: 1 },
        { value: 'otoemisiones', label: 'Otoemisiones Acústicas', duration: 1 },
        { value: 'impedanciometria', label: 'Impedaciometría', duration: 1 },
        { value: 'potencial', label: 'Potencial Evocado', duration: 1 },
        { value: 'otoemisiones-potencial', label: 'Otoemisiones Acústicas y Potencial Evocado', duration: 1 },
    ]

    const cancel = () => {
        setData(voidData)
        setDate(null)
        setSelectedStudy(voidStudy)
    }

    const saveBooking = async () => {
        try {
            setLoading(true)
            const booked = await createBooking({ ...data, studyId: selectedStudy.value })
            if (booked && booked._id) {
                toast.success('¡Turno confirmado!')
                setBooked(true)
            } else {
                toast.error('Ocurrió un error al guardar. Por favor intenta nuevamente.')
            }
            setLoading(false)
        } catch (error) {
            toast.error('Ocurrió un error al guardar. Por favor intenta nuevamente.')
            setLoading(false)
        }
    }

    const tileDisabled: TileDisabledFunc = ({ activeStartDate, date, view }): boolean => {
        const day = date.getDay()
        const today = new Date()
        const isTodayOrBefore = date <= today
        const dayIsAvailable = true
        if (dayIsAvailable) return day == 6 || day == 0 || isTodayOrBefore
        return false
    }

    const selectDate = (date: any) => {
        setDate(date)
        setOpenCalendar(false)
    }

    const formateDate = (date: Date | number | string) => {
        const day = new Date(date).toLocaleDateString('es-ES')
        const time = new Date(date).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false })
        return day + ', ' + time
    }

    const selectTime = (time: any) => {
        console.log('Time selected:', time)
    }

    const checkData = () => {
        // console.log('data', data)
        // console.log('selectedStudy', selectedStudy)
        // console.log('date', date)

        return Boolean(data.firstName && data.lastName
            && (data.email || data.phone)
            && date && selectedStudy.label)
    }

    const openCalendarTab = () => {
        const a = document.createElement('a')
        a.style.display = 'none'
        a.target = '_blank'
        a.href = calendarLink
        a.click()
    }

    return (
        <>
            <Header />
            <div className="page__container-admin">
                {/* <h1 className='page__title' style={{ textAlign: 'center' }}>Turnos</h1> */}
                <div className="booking__row">
                    <div className="booking__form-container">
                        <div className="booking__form">
                            <p className='page__text'>Completá el formulario con tu información y elegí una fecha y hora para tu próximo turno:</p>
                            <Dropdown
                                label="Tipo de estudio"
                                options={studies}
                                objKey='label'
                                value={selectedStudy}
                                selected={selectedStudy}
                                setSelected={setSelectedStudy}
                            />
                            <div className="booking__form-datetime">
                                {openCalendar ?
                                    <Calendar
                                        locale='es-ES'
                                        onChange={selectDate}
                                        value={date}
                                        tileDisabled={tileDisabled}
                                        className='react-calendar'
                                    />
                                    :
                                    <Button
                                        label={date ? new Date(date).toLocaleDateString('es-ES') : 'Seleccioná una fecha'}
                                        handleClick={() => setOpenCalendar(true)}
                                        bgColor="#6ad1c5"
                                        textColor="#fff"
                                    />}
                                {date ? <Dropdown
                                    label="Hora"
                                    options={timeOptions}
                                    value={selectedTime}
                                    selected={selectedTime}
                                    setSelected={selectTime}
                                /> : ''}
                            </div>
                            <InputField
                                name="firstName"
                                label="Nombre(s) de pila"
                                updateData={updateData}
                            />
                            <InputField
                                name="lastName"
                                label="Apellido(s)"
                                updateData={updateData}
                            />
                            <InputField
                                name="email"
                                label="Email"
                                updateData={updateData}
                            />
                            <InputField
                                name="phone"
                                label="Teléfono de contacto"
                                updateData={updateData}
                            />
                            <div className="booking__form-btns">
                                <Button
                                    label="Cancelar"
                                    handleClick={cancel}
                                    bgColor="gray"
                                    textColor="#fff"
                                    disabled={booked}
                                />
                                <Button
                                    label="Confirmar turno"
                                    handleClick={saveBooking}
                                    bgColor="#6ad1c5"
                                    textColor="#fff"
                                    disabled={!checkData() || booked}
                                    loading={loading}
                                />
                            </div>
                        </div>
                    </div>
                    {checkData() ?
                        <div className="booking__voucher">
                            <div className="booking__voucher-details">
                                <h2 style={{ margin: '0 0 1rem' }}>{selectedStudy.label}</h2>
                                <p className="booking__voucher-text">
                                    <strong>Cuándo: </strong>{date.toLocaleDateString('es-AR')}, {date.toLocaleTimeString().substr(0, 5)}
                                </p>
                                <p className="booking__voucher-text">
                                    <strong>Dónde: </strong> <a href="https://maps.app.goo.gl/tSx7kDDXE993Gvyh6" target="_blank">Aristóbulo del Valle 171, Concordia, ER</a>
                                </p>
                                <QRCode
                                    size={180}
                                    style={{ margin: '1rem auto', filter: !booked ? 'blur(3px)' : '' }}
                                    value={web + qr}
                                />
                            </div>
                            {!booked ?
                                <Button
                                    label="Confirmar turno"
                                    handleClick={saveBooking}
                                    bgColor="#6ad1c5"
                                    textColor="#fff"
                                    disabled={!checkData()}
                                    style={{ margin: '0 1rem', width: '-webkit-fill-available' }}
                                />
                                : ''}
                            <Button
                                label="Agregar a Google Calendar"
                                handleClick={openCalendarTab}
                                bgColor="#6ad1c5"
                                textColor="#fff"
                                disabled={!booked}
                                style={{ margin: '1rem', width: '-webkit-fill-available' }}
                            />
                        </div> : ''}
                </div>
            </div>
            <Footer />
        </>
    )
}