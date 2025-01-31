import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from "../../../../lib/mongo";
import Booking from 'src/models/Booking';

export async function POST(request: NextRequest) {
    try {
        await connectToDatabase()

        const bookingData = await request.json()
        const { _id } = bookingData
        const removed = await Booking.deleteOne({ _id })

        return NextResponse.json({ ...removed, removed: true })
    } catch (err: any) {
        console.error("Next API Error: ", err)
        return NextResponse.json({ error: err.code }, { status: err.status })
    }
}