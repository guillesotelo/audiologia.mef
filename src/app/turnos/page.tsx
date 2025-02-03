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
import { createOrUpdateBooking, getBookings } from "src/services"
import { bookingType, dataObj } from "../types"
import { getDate } from "src/helpers"
import { studies } from "src/constants"

type Props = {}

const voidStudy = { value: '', label: '', duration: 0 }
const voidData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
}
const web = `https://audiologia-mef.vercel.app/`

export default function Turnos({ }: Props) {
    const [data, setData] = useState<dataObj>(voidData)
    const [date, setDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<any>(null)
    const [timeOptions, setTimeOptions] = useState<Date[]>([])
    const [openCalendar, setOpenCalendar] = useState(false)
    const [selectedStudy, setSelectedStudy] = useState(voidStudy)
    const [calendarLink, setCalendarLink] = useState('')
    const [booked, setBooked] = useState(false)
    const [loading, setLoading] = useState(false)
    const [busySlots, setBusySlots] = useState<bookingType[]>([])
    const [slotsLoading, setSlotsLoading] = useState(true)
    const [qr, setQr] = useState('')

    useEffect(() => {
        if (data.firstName && data.lastName && (data.phone || data.email) && date) {
            const start = new Date(date).toISOString().replace(/[^\w\s]/gi, '')
            const end = endDate ? endDate.toISOString().replace(/[^\w\s]/gi, '') : start
            const details = `Audiolog%C3%ADa+MEF+-+${selectedStudy.label}%0D%0A%0D%0AProfesional%3A+Lic.+Mar%C3%ADa+Elisa+Fontana%0D%0ADirecci%C3%B3n%3A+A.+del+Valle+171%2C+Concordia%2C+ER%0D%0ATel%3A+%280345%29+422-2639%0D%0A%0D%0ASi+desea+cancelar+el+turno+o+no+puede+asistir%2C+debe+informarlo+al+menos+24+horas+antes+de+la+hora+de+comienzo.%0D%0A%0D%0AGracias+y+nos+vemos+pronto%21`

            setCalendarLink(`https://calendar.google.com/calendar/u/0/r/eventedit?text=${selectedStudy.label.replace(' ', '+')}&details=${details}&dates=${start}/${end}`)
            setQr(`${web}turno?name=${data.firstName}&lastName=${data.lastName}&phone=${data.phone}&email=${data.email}&date=${new Date(date).getTime()}`)
        } else setQr('')
    }, [data, date])

    useEffect(() => {
        if (selectedStudy && selectedStudy.value) getAllBookings()
        setDate(null)
        setOpenCalendar(false)
    }, [selectedStudy])

    useEffect(() => {
        if (!slotsLoading && date) {
            const hourOptions = [8, 9, 10, 11, 12, 16, 17, 18, 19]
            let timeTable: Date[] = []

            hourOptions.forEach((h, i) => {
                const hour = new Date(date)
                hour.setHours(h)
                const halfHour = new Date(hour)
                halfHour.setMinutes(30)

                timeTable.push(hour)
                timeTable.push(halfHour)
            })

            const freeSlots = timeTable.filter(time => {
                let booked = Boolean(new Date(time).getTime() < new Date().getTime())
                busySlots.forEach(b => {
                    if (getDate(b.date || new Date()) === getDate(time)) {
                        booked = true
                    }
                })
                if (!booked) return time
            })

            setTimeOptions(freeSlots)
        }
    }, [busySlots, date])

    const getAllBookings = async () => {
        try {
            const slots = await getBookings()
            if (slots && Array.isArray(slots)) setBusySlots(slots)
            setSlotsLoading(false)
        } catch (error) {
            console.error(error)
        }
    }

    const updateData = (key: string, e: any, max?: number) => {
        let { value } = e.target
        const isNumber = typeof value === 'number'
        if (max && String(value).length > max) {
            value = isNumber ? Number(String(value).slice(0, max)) : value.slice(0, max)
        }

        const ageKeys = ['ageDay', 'ageMonth', 'ageYear']
        if (ageKeys.includes(key)) {
            value = Number(value) > 0 ? value : 1
        }
        setData(prev => ({ ...prev, [key]: value }))
    }

    const cancel = () => {
        setData(voidData)
        setDate(null)
        setBooked(false)
        setSelectedStudy(voidStudy)
    }

    const saveBooking = async () => {
        try {
            setLoading(true)
            const bookingData = {
                ...data,
                studyId: selectedStudy.value,
                studyName: selectedStudy.label,
                date,
                calendarLink,
                qr,
                age: new Date(`${data.ageYear}-${data.ageMonth}-${data.ageDay}`)
            }
            const booked = await createOrUpdateBooking(bookingData)
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
        const isTodayOrBefore = date.getTime() < today.getTime() - 100000000
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
        const [hours, minutes] = time.split(':')
        const dateWithTime = new Date(date || new Date())
        dateWithTime.setHours(hours)
        dateWithTime.setMinutes(minutes)

        setDate(dateWithTime)
    }

    const checkData = () => {
        return Boolean(data.firstName && data.lastName
            && (data.email || data.phone)
            && (data.ageDay && data.ageMonth && data.ageYear)
            && date && selectedStudy.label)
    }

    const openCalendarTab = () => {
        const a = document.createElement('a')
        a.style.display = 'none'
        a.target = '_blank'
        a.href = calendarLink
        a.click()
    }

    const refreshPage = () => {
        const a = document.createElement('a')
        a.href = window.location.href
        a.click()
    }

    return (
        <>
            <Header />
            <div className="booking__container">
                {/* <h1 className='page__title' style={{ textAlign: 'center' }}>Turnos</h1> */}
                <div className="booking__row">
                    <div className={`booking__form-container ${booked ? 'booking__form-container-booked' : ''}`}>
                        <div className="booking__form">
                            <h2 style={{ margin: '1rem 0 0' }}>Nuevo turno</h2>
                            <p className='page__text' style={{ margin: '0 0 1rem' }}>Completá el formulario con tu información y elegí una fecha y hora para tu próximo turno:</p>
                            <Dropdown
                                label="Tipo de estudio"
                                options={studies}
                                objKey='label'
                                value={selectedStudy}
                                selected={selectedStudy}
                                setSelected={setSelectedStudy}
                            />
                            {selectedStudy.label ?
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
                                    {date ? timeOptions.length ?
                                        <Dropdown
                                            label="Hora"
                                            options={timeOptions.map(t => t.toLocaleTimeString('ES-es', { hour: '2-digit', minute: '2-digit' }))}
                                            value={date.getHours() !== 0 ? date.toLocaleTimeString('ES-es', { hour: '2-digit', minute: '2-digit' }) : null}
                                            selected={date.getHours() !== 0 ? date.toLocaleTimeString('ES-es', { hour: '2-digit', minute: '2-digit' }) : null}
                                            setSelected={selectTime}
                                        /> :
                                        slotsLoading ? <p>Cargando horarios...</p>
                                            :
                                            <p style={{ color: 'red' }}>No hay horarios disponibles para este día.</p>
                                        : ''}
                                </div>
                                : ''}
                            {date && date.getHours() !== 0 ? <>
                                <InputField
                                    name="firstName"
                                    label="Nombre(s)"
                                    updateData={updateData}
                                    placeholder="María Victoria"
                                />
                                <InputField
                                    name="lastName"
                                    label="Apellido(s)"
                                    updateData={updateData}
                                    placeholder="García Lopez"
                                />

                                <div className="booking__form-age-container">
                                    <p className="booking__form-age-title">Fecha de nacimiento</p>
                                    <div className="booking__form-age">
                                        <InputField
                                            name="ageDay"
                                            label="Día"
                                            updateData={updateData}
                                            placeholder="DD"
                                            type="number"
                                            style={{ width: '26%' }}
                                            maxLength={2}
                                            value={data.ageDay}
                                        />
                                        <InputField
                                            name="ageMonth"
                                            label="Mes"
                                            updateData={updateData}
                                            placeholder="MM"
                                            type="number"
                                            style={{ width: '26%' }}
                                            maxLength={2}
                                            value={data.ageMonth}
                                        />
                                        <InputField
                                            name="ageYear"
                                            label="Año"
                                            updateData={updateData}
                                            placeholder="AAAA"
                                            type="number"
                                            style={{ width: '36%' }}
                                            maxLength={4}
                                            value={data.ageYear}
                                        />
                                    </div>
                                </div>
                                <InputField
                                    name="email"
                                    label="Email"
                                    updateData={updateData}
                                    placeholder="tu@mail.com"
                                />
                                <InputField
                                    name="phone"
                                    label="Teléfono de contacto"
                                    updateData={updateData}
                                    placeholder="34567891011"
                                />
                            </> : ''}
                            {selectedStudy.label ?
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
                                </div> : ''}
                        </div>
                    </div>
                    {checkData() ?
                        <div className="booking__voucher">
                            {booked ? <p className="booking__voucher-confirmed">Tu turno está confirmado. {data.email ? 'Revisá tu bandeja de entrada para más información.' : ''}</p> : ''}
                            <div className="booking__voucher-details">
                                <h2 style={{ margin: '0 0 1rem' }}>{selectedStudy.label}</h2>
                                <p className="booking__voucher-text">
                                    <strong>Cuándo: </strong>{date?.toLocaleDateString('es-AR')}, {date?.toLocaleTimeString().substr(0, 5)}
                                </p>
                                <p className="booking__voucher-text">
                                    <strong>Dónde: </strong> <a href="https://maps.app.goo.gl/tSx7kDDXE993Gvyh6" target="_blank">Aristóbulo del Valle 171, Concordia, ER</a>
                                </p>
                                <QRCode
                                    size={180}
                                    style={{ margin: '1rem auto', filter: !booked ? 'blur(3px)' : '' }}
                                    value={qr}
                                />
                                <p style={{ margin: 0 }}>Escaneá el código QR para ver los detalles de tu turno</p>
                            </div>
                            {!booked ?
                                <Button
                                    label="Confirmar turno"
                                    handleClick={saveBooking}
                                    bgColor="#6ad1c5"
                                    textColor="#fff"
                                    disabled={!checkData()}
                                    loading={loading}
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
                            <Button
                                label="Sacar otro turno"
                                handleClick={refreshPage}
                                bgColor="#fff"
                                textColor="#6ad1c5"
                                disabled={!booked}
                                style={{ margin: '0 1rem 1rem', width: '-webkit-fill-available' }}
                                outline
                            />
                        </div> : ''}
                </div>
            </div>
            <Footer />
        </>
    )
}