import { verifyToken } from 'src/services'
import Admin from './admin'
import { getUser } from 'src/helpers'
import Home from '../home/page'
import { cookies } from 'next/headers';

const verifyUser = async () => {
    try {
        const verified = await verifyToken(cookies().get("token")?.value)
        return verified && verified.decoded && verified.decoded.email
    } catch (error) {
        return false
    }
}

export default async function AdminPage() {
    const isLoggedIn = await verifyUser()

    console.log('isLoggedIn', isLoggedIn)

    return isLoggedIn ? <Admin /> : <Home />
}
