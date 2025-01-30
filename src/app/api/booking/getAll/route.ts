import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from "../../../../lib/mongo";
import Booking from 'src/models/Booking';

export async function GET(request: NextRequest) {
    try {
        await connectToDatabase()

        const bookingsByServiceId = await Booking.find().lean()

        return NextResponse.json(bookingsByServiceId)
    } catch (err: any) {
        console.error("Next API Error: ", err)
        return NextResponse.json({ error: err.code }, { status: err.status })
    }
}