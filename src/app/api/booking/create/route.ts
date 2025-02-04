import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from "../../../../lib/mongo"
import Booking from 'src/models/Booking'
import { sendNewBookingAdmin, sendNewBookingClient } from '../../../../lib/nodemailer'

export async function POST(request: NextRequest) {
    try {
        await connectToDatabase()

        const bookingData = await request.json()
        let exists = false

        if (bookingData._id) {
            const existingBooking = await Booking.findById(bookingData._id)
            if (existingBooking && existingBooking._id) exists = true
        }

        const newBooking = exists
            ? await Booking.findByIdAndUpdate(bookingData._id, bookingData, { new: true })
            : await Booking.create(bookingData)

        if (newBooking && newBooking._id) {
            // Fire-and-forget email sending (doesn't block response)
            setTimeout(() => {
                Promise.allSettled([
                    sendNewBookingAdmin(newBooking),
                    sendNewBookingClient(newBooking)
                ]).then(results => {
                    results.forEach((result, index) => {
                        if (result.status === "rejected") {
                            console.error(`Email #${index + 1} failed:`, result.reason)
                        }
                    })
                }).catch(err => console.error("Promise.allSettled failed:", err))
            }, 0)
        }

        return NextResponse.json(newBooking)
    } catch (err: any) {
        console.error("Next API Error: ", err)
        return NextResponse.json({ error: err.code }, { status: err.status })
    }
}
