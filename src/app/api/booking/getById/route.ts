import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from "../../../../lib/mongo";
import Booking from 'src/models/Booking';

export async function GET(request: NextRequest) {
    try {
        await connectToDatabase()
        const id = request.nextUrl.searchParams.get('_id')

        const found = await Booking.findById(id)
        if(!found) return NextResponse.json({})

        return NextResponse.json(found)
    } catch (err: any) {
        console.error("Next API Error: ", err)
        return NextResponse.json({ error: err.code }, { status: err.status })
    }
}