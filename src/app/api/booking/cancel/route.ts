import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from "../../../../lib/mongo";
import Booking from 'src/models/Booking';
import { sendCancelBooking } from 'src/lib/nodemailer';

export async function POST(request: NextRequest) {
    try {
        await connectToDatabase()

        const bookingData = await request.json()
        const { _id } = bookingData
        const removed = await Booking.deleteOne({ _id })

        setTimeout(() => {
            Promise.allSettled([
                sendCancelBooking(bookingData)
            ]).then(results => {
                results.forEach((result, index) => {
                    if (result.status === "rejected") {
                        console.error(`Email #${index + 1} failed:`, result.reason)
                    }
                })
            }).catch(err => console.error("Promise.allSettled failed:", err))
        }, 0)

        return NextResponse.json({ ...removed, removed: true })
    } catch (err: any) {
        console.error("Next API Error: ", err)
        return NextResponse.json({ error: err.code }, { status: err.status })
    }
}