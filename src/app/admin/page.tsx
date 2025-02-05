import { verifyToken } from 'src/services'
import Admin from './admin'
import { getUser } from 'src/helpers'
import Home from '../home/page'

const verifyUser = async () => {
    try {
        const verified = await verifyToken(getUser().token)
        return verified && verified.token
    } catch (error) {
        return false
    }
}

export default async function AdminPage() {
    const isLoggedIn = await verifyUser()

    return isLoggedIn ? <Admin /> : <Home />
}
