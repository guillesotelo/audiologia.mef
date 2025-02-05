import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(req: NextRequest) {
    const { token } = await req.json()

    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        return NextResponse.json({ loggedIn: true, decoded }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ loggedIn: false, error: "Invalid token" }, { status: 401 });
    }
}
