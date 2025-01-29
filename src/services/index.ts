import axios from 'axios';
import { dataObj, userType, bookingType } from '../app/types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

// User
const loginUser = async (data: userType) => {
    try {
        const user = await axios.post(`${BASE_URL}/api/user/login`, data, { withCredentials: true })
        const localUser = JSON.parse(localStorage.getItem('user') || '{}')
        localStorage.setItem('user', JSON.stringify({
            ...localUser,
            ...user.data
        }))
        return user.data
    } catch (err) { console.error(err) }
}

const verifyToken = async (token?: string) => {
    try {
        const verify = await axios.post(`${BASE_URL}/api/user/verify`, {}, { withCredentials: true, params: { token } })
        return verify.data || false
    } catch (err) { return false }
}

const registerUser = async (data: userType) => {
    try {
        const newUser = await axios.post(`${BASE_URL}/api/user/create`, data, { withCredentials: true })
        return newUser.data
    } catch (err) { console.error(err) }
}

const updateUser = async (data: userType, token?: string) => {
    try {
        const user = await axios.post(`${BASE_URL}/api/user/update`, data, { withCredentials: true, params: { token } })
        const localUser = JSON.parse(localStorage.getItem('user') || '{}')
        localStorage.setItem('user', JSON.stringify({
            ...localUser,
            ...user.data
        }))
        return user.data
    } catch (err) { console.error(err) }
}

const logOut = async () => {
    try {
        const loggedOut = await axios.post(`${BASE_URL}/api/user/logout`, {}, { withCredentials: true })
        return loggedOut.data
    } catch (err) { return false }
}

// Booking
const getBookings = async (token?: string) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/booking/getAll`, { withCredentials: true, params: { token } })
        return Array.isArray(res.data) ? res.data : []
    } catch (err) { console.error(err) }
}

const getBookingSlots = async (studyId: string) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/booking/getSlots`, { params: { studyId } })
        return Array.isArray(res.data) ? res.data : []
    } catch (err) { console.error(err) }
}

const getBookingById = async (_id: string, token?: string) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/booking/getById`, { params: { _id, token }, withCredentials: true })
        return res.data
    } catch (err) { console.error(err) }
}

const createBooking = async (data: bookingType) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/booking/create`, data)
        return res.data
    } catch (err) { console.error(err) }
}

const updateBooking = async (data: bookingType, token?: string) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/booking/update`, data, { withCredentials: true, params: { token } })
        return res.data
    } catch (err) { console.error(err) }
}

const cancelBooking = async (data: bookingType) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/booking/cancel`, data)
        return res.data
    } catch (err) { console.error(err) }
}

// Mailing
const getAllEmails = async (token?: string) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/app/getEmails`, { withCredentials: true, params: { token } })
        return res.data
    } catch (err) { console.error(err) }
}

const sendContactEmail = async (data: dataObj) => {
    try {
        const email = await axios.post(`${BASE_URL}/api/app/sendContactEmail`, data)
        return email.data
    } catch (err) { console.error(err) }
}

export {
    sendContactEmail,
    getAllEmails,

    loginUser,
    verifyToken,
    registerUser,
    updateUser,
    logOut,

    getBookings,
    getBookingSlots,
    getBookingById,
    createBooking,
    updateBooking,
    cancelBooking,
}