import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from "../../../../lib/mongo";
import Booking from 'src/models/Booking';

export async function POST(request: NextRequest) {
    try {
        await connectToDatabase()

        const bookingData = await request.json()
        const newBooking = await Booking.create(bookingData)

        return NextResponse.json(newBooking)
    } catch (err: any) {
        console.error("Next API Error: ", err)
        return NextResponse.json({ error: err.code }, { status: err.status })
    }
}