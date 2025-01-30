'use client'

import { useEffect, useState } from "react"
import Footer from "src/components/Footer/Footer"
import Header from "src/components/Header/Header"
import { getBookings } from "src/services"
import { bookingType, dataObj } from "../types"
import DataTable from "src/components/DataTable/DataTable"
import { bookingHeaders } from "src/constants"

type Props = {}


export default function Turnos({ }: Props) {
    const [bookings, setBookings] = useState<bookingType[]>([])

    useEffect(() => {
        getAllBookings()
    }, [])

    const getAllBookings = async () => {
        try {
            const slots = await getBookings()
            if (slots && Array.isArray(slots)) setBookings(slots)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <Header />
            <div className="page__container-admin">
                <DataTable
                    title="Turnos"
                    tableData={bookings}
                    setTableData={setBookings}
                    tableHeaders={bookingHeaders}
                />
            </div>
            <Footer />
        </>
    )
}