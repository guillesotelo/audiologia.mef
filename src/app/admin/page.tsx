'use client'

import { useEffect, useState } from "react"
import Footer from "src/components/Footer/Footer"
import Header from "src/components/Header/Header"
import { cancelBooking, createOrUpdateBooking, getBookings } from "src/services"
import { bookingType, dataObj } from "../types"
import DataTable from "src/components/DataTable/DataTable"
import { bookingHeaders, studies } from "src/constants"
import { Calendar as EventCalendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment';
import 'moment/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import Modal from "src/components/Modal/Modal"
import { getDate } from "src/helpers"
import Dropdown from "src/components/Dropdown/Dropdown"
import Calendar, { TileDisabledFunc } from "react-calendar"
import Button from "src/components/Button/Button"
import InputField from "src/components/InputField/InputField"
import toast from "react-hot-toast"
import { BounceLoader } from "react-spinners"

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
    const [data, setData] = useState<dataObj>({})
    const [bookings, setBookings] = useState<bookingType[]>([])
    const [selected, setSelected] = useState<bookingType | null>(null)
    const [date, setDate] = useState<any>(null)
    const [calendarDate, setCalendarDate] = useState<any>(null)
    const [newBooking, setNewBooking] = useState<bookingType | null>(null)
    const [removeBooking, setRemoveBooking] = useState<string | null>(null)
    const [view, setView] = useState<any>(Views.WEEK)
    const [selectedStudy, setSelectedStudy] = useState<any>(voidStudy)
    const [openCalendar, setOpenCalendar] = useState(false)
    const [timeOptions, setTimeOptions] = useState<Date[]>([])
    const [slotsLoading, setSlotsLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    const [calendarLink, setCalendarLink] = useState('')
    const [qr, setQr] = useState('')
    const localizer = momentLocalizer(moment)

    useEffect(() => {
        getAllBookings()
    }, [])

    useEffect(() => {
        upperCaseCalendarLabel()
    }, [view])

    useEffect(() => {

        const current: any = selected || newBooking || {}
        // We do this to reset the time selected
        if (current.studyId && selectedStudy.value !== current.studyId || (date && date.getHours() === 0)) {
            const newDate = new Date(date)
            newDate.setHours(0)
            newDate.setMinutes(0)
            setDate(newDate)
        }

        setOpenCalendar(false)
    }, [selectedStudy])

    useEffect(() => {
        const current: any = selected || newBooking || {}
        if (current) {
            const start = new Date(current.date || new Date()).toISOString().replace(/[^\w\s]/gi, '')
            let end: Date | string = new Date(current.end || current.date || date)

            if (!current.end) end.setMinutes(end.getMinutes() + selectedStudy.duration || 30)
            end = end.toISOString().replace(/[^\w\s]/gi, '')

            const details = `Audiolog%C3%ADa+MEF+-+${selectedStudy.label || data.studyName}%0D%0A%0D%0AProfesional%3A+Lic.+Mar%C3%ADa+Elisa+Fontana%0D%0ADirecci%C3%B3n%3A+A.+del+Valle+171%2C+Concordia%2C+ER%0D%0ATel%3A+%280345%29+422-2639%0D%0A%0D%0ASi+desea+cancelar+el+turno+o+no+puede+asistir%2C+debe+informarlo+al+menos+24+horas+antes+de+la+hora+de+comienzo.%0D%0A%0D%0AGracias+y+nos+vemos+pronto%21`

            setCalendarLink(`https://calendar.google.com/calendar/u/0/r/eventedit?text=${selectedStudy.label.replace(' ', '+')}&details=${details}&dates=${start}/${end}`)
            setQr(`${web}turno?name=${current.firstName}&lastName=${current.lastName}&phone=${current.phone}&email=${current.email}&date=${new Date(date).getTime()}`)
        } else setQr('')

        setData(current)
        setDate(new Date(current.date || new Date()))
        if (current.studyId) setSelectedStudy(studies.find(s => s.value === current.studyId))
    }, [newBooking, selected])

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
                bookings.forEach(b => {
                    if (getDate(b.date || new Date()) === getDate(time)) {
                        booked = true
                    }
                })
                if (!booked) return time
            })

            setTimeOptions(freeSlots)
        }
    }, [bookings, date, calendarDate, selected, newBooking, data])

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
                age: new Date(`${parseDoB(data.ageYear)}-${parseDoB(data.ageMonth)}-${parseDoB(data.ageDay)}`)
            }
            const booked = await createOrUpdateBooking(bookingData)
            if (booked && booked._id) toast.success('¡Turno guardado!')
            else toast.error('Ocurrió un error al guardar. Por favor intenta nuevamente.')
            setLoading(false)
            emptyData()
            getAllBookings()
        } catch (error) {
            toast.error('Ocurrió un error al guardar. Por favor intenta nuevamente.')
            setLoading(false)
        }
    }

    const parseDoB = (n: number | string) => {
        return String(n).length === 1 ? `0${n}` : n
    }

    const getAllBookings = async () => {
        try {
            setSlotsLoading(true)
            const slots = await getBookings()
            if (slots && Array.isArray(slots)) setBookings(slots)
            setSlotsLoading(false)
        } catch (error) {
            setSlotsLoading(false)
            console.error(error)
        }
    }

    const getCalendarEvents = () => {
        let bookingEvents: bookingType[] = []
        bookings.forEach(booking => {
            bookingEvents.push({
                ...booking,
                // id: booking._id,
                title: `${booking.studyName} - ${booking.firstName} ${booking.lastName}`,
                start: moment(booking.date).toDate(),
                end: moment(booking.date).add(booking.duration || 30, 'minutes').toDate()
            })
        })
        return bookingEvents
    }

    const handleSelectBooking = (booking: bookingType) => {
        setSelected(booking)
        setSelectedStudy(studies.find(s => s.value === booking.studyId))
    }

    const handleSelectSlot = (booking: bookingType) => {
        const { start, end } = booking
        if (start) setCalendarDate(start)
        setNewBooking({
            date: start,
            start,
            end
        })
    }

    const messages = {
        allDay: 'Todo el día',
        previous: '◄ Anterior',
        next: 'Siguiente ►',
        today: 'Hoy',
        month: 'Mes',
        week: 'Semana',
        day: 'Día',
        date: 'Fecha',
        time: 'Hora',
        event: 'Turno',
        noEventsInRange: 'No hay turnos en este rango',
    }

    const upperCaseCalendarLabel = () => {
        const span = document.querySelector('.rbc-toolbar-label') as HTMLSpanElement
        if (span) {
            span.innerText = span.innerText
                .split(' ')
                .map(c => c.split('')
                    .map((cc, i) => i === 0 ? cc.toUpperCase() : cc)
                    .join(''))
                .join(' ')
        }
    }

    const selectDate = (date: any) => {
        setDate(date)
        setOpenCalendar(false)
    }

    const selectTime = (time: any) => {
        const [hours, minutes] = time.split(':')
        const dateWithTime = new Date(date || new Date())
        dateWithTime.setHours(hours)
        dateWithTime.setMinutes(minutes)

        setDate(dateWithTime)
    }

    const tileDisabled: TileDisabledFunc = ({ activeStartDate, date, view }): boolean => {
        const day = date.getDay()
        const today = new Date()
        const isTodayOrBefore = date.getTime() < today.getTime() - 100000000
        const dayIsAvailable = true
        if (dayIsAvailable) return day == 6 || day == 0 || isTodayOrBefore
        return false
    }

    const updateData = (key: string, e: any, max?: number) => {
        let { value } = e.target
        const isNumber = typeof value === 'number'
        if (max && String(value).length > max) {
            value = isNumber ? Number(String(value).slice(0, max)) : value.slice(0, max)
        }

        setData(prev => ({ ...prev, [key]: value }))
    }

    const emptyData = () => {
        setData(voidData)
        setDate(null)
        // setCalendarDate(null)
        setSelectedStudy(voidStudy)
        setSelected(null)
        setNewBooking(null)
    }

    const checkData = () => {
        const current: any = data
        return Boolean(current.firstName && current.lastName
            && (current.email || current.phone)
            && (current.ageDay && current.ageMonth && current.ageYear)
            && date && selectedStudy.label)
    }

    const disableWeekends = (date: Date) => {
        const day = date.getDay() // 0 = Sunday, 6 = Saturday
        return day !== 0 && day !== 6
    }

    const removeSelectedBooking = async () => {
        if (selected?._id) {
            try {
                const removed = await cancelBooking(selected)
                if (removed) {
                    toast.success('Turno eliminado!')
                    setRemoveBooking(null)
                    setTimeout(() => {
                        setSelected(null)
                        setNewBooking(null)
                        getAllBookings()
                    }, 1000)
                }
                else toast.error('Error al eliminar turno. Probá nuevamente.')
            } catch (error) {
                toast.error('Error al eliminar turno. Probá nuevamente.')
            }
        }
    }

    return (
        <>
            <Header />
            {slotsLoading ?
                <Modal>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <BounceLoader size={50} color="#2fc4b2" />
                        <p>Cargando turnos...</p>
                    </div>
                </Modal>
                : ''}
            <div className="page__container-admin" style={{ filter: slotsLoading ? 'blur(5px)' : '' }}>
                <h1 style={{ filter: selected || newBooking ? 'blur(5px)' : '' }}>Panel administrador</h1>
                {removeBooking ?
                    <Modal
                        title='Estás segura que querés cancelar y eliminar este turno?'
                        onClose={() => setRemoveBooking(null)}>
                        <p>{ }</p>
                        <div className="booking__form-btns">
                            <Button
                                label="Cancelar"
                                handleClick={() => setRemoveBooking(null)}
                                bgColor="gray"
                                textColor="#fff"
                            />
                            <Button
                                label="Confirmar y eliminar"
                                handleClick={removeSelectedBooking}
                                bgColor="#fff"
                                textColor="#FF0000"
                                loading={loading}
                                outline
                            />
                        </div>
                    </Modal>
                    : selected || newBooking ?
                        <Modal
                            title={selected ? selected.studyName : (newBooking?.studyName || 'Nuevo turno')}
                            onClose={emptyData}>
                            <div className="booking__form">
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
                                    {date ? timeOptions.length ?
                                        <Dropdown
                                            label="Hora"
                                            options={timeOptions.map(t => t.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }))}
                                            value={date.getHours() !== 0 ? date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) : null}
                                            selected={date.getHours() !== 0 ? date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) : null}
                                            setSelected={selectTime}
                                        /> :
                                        <p style={{ color: 'red' }}>No hay horarios disponibles para este día.</p>
                                        : ''}
                                </div>
                                <InputField
                                    name="firstName"
                                    label="Nombre(s)"
                                    updateData={updateData}
                                    placeholder="María Victoria"
                                    value={data.firstName}
                                />
                                <InputField
                                    name="lastName"
                                    label="Apellido(s)"
                                    updateData={updateData}
                                    placeholder="García Lopez"
                                    value={data.lastName}
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
                                    value={data.email}
                                />
                                <InputField
                                    name="phone"
                                    label="Teléfono de contacto"
                                    updateData={updateData}
                                    placeholder="34567891011"
                                    value={data.phone}
                                />
                                <div className="booking__form-btns">
                                    <Button
                                        label={newBooking ? 'Cancelar' : "Descartar cambios"}
                                        handleClick={emptyData}
                                        bgColor="gray"
                                        textColor="#fff"
                                    />
                                    <Button
                                        label={newBooking ? 'Confirmar turno' : "Guardar cambios"}
                                        handleClick={saveBooking}
                                        bgColor="#6ad1c5"
                                        textColor="#fff"
                                        disabled={!checkData()}
                                        loading={loading}
                                    />
                                </div>
                                {newBooking ? '' :
                                    <Button
                                        label="Cancelar y eliminar turno"
                                        handleClick={() => selected ? setRemoveBooking(selected._id || null) : null}
                                        bgColor="#fff"
                                        textColor="#FF0000"
                                        loading={loading}
                                        outline
                                        style={{ marginTop: '1rem' }}
                                    />}
                            </div>
                        </Modal>
                        : ''}
                <EventCalendar
                    localizer={localizer}
                    events={getCalendarEvents()}
                    startAccessor="start"
                    endAccessor="end"
                    defaultDate={new Date()}
                    views={["day", "agenda", "week", "month"]}
                    view={view}
                    date={calendarDate}
                    selectable
                    defaultView="month"
                    style={{
                        height: "70vh",
                        width: '60vw',
                        zIndex: 0,
                        marginBottom: '5rem',
                        filter: selected || newBooking ? 'blur(5px)' : ''
                    }}
                    onSelectEvent={handleSelectBooking}
                    onSelectSlot={handleSelectSlot}
                    min={new Date(0, 0, 0, 8, 0, 0)}
                    max={new Date(0, 0, 0, 21, 0, 0)}
                    messages={messages}
                    onView={(view) => setView(view)}
                    onNavigate={(date) => setCalendarDate(new Date(date))}
                    dayPropGetter={(date) => {
                        const today = new Date()
                        return disableWeekends(date) ? {} :
                            (date.getDate() === today.getDate() &&
                                date.getMonth() === today.getMonth() &&
                                date.getFullYear() === today.getFullYear()) ?
                                {
                                    style: {
                                        backgroundColor: "#f0f0f0",
                                        color: "#000",
                                        fontWeight: "bold",
                                    }
                                }
                                :
                                {
                                    className: "rbc-off-range-bg",
                                    style: { backgroundColor: "#f0f0f0", pointerEvents: "none" }
                                }
                    }}
                />
                <DataTable
                    title="Todos los turnos"
                    tableData={bookings}
                    setTableData={setBookings}
                    tableHeaders={bookingHeaders}
                    selected={bookings.findIndex(b => b._id === selected?._id)}
                    setSelected={(index) => setSelected(bookings[index])}
                    style={{ filter: selected || newBooking ? 'blur(5px)' : '' }}
                />
            </div>
            <Footer />
        </>
    )
}