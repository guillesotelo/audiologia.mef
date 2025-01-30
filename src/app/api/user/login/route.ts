import { NextResponse } from 'next/server'
import User from 'src/models/User'
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json()

        const user = await User.findOne({ email })

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
        }
        const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "1h" })

        // Create the Set-Cookie header manually
        const response = NextResponse.json({ token })

        response.headers.append(
            'Set-Cookie',
            `token=${token}; HttpOnly; Secure; SameSite=None; Max-Age=${3600 * 24 * 30}; Path=/`
        );

        return response
    } catch (err: any) {
        console.error('Error setting cookie:', err)
        return NextResponse.json({ error: err.code }, { status: err.status || 500 })
    }
}
