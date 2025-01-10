import axios from 'axios';
import { dataObj, userType, editionType, subscriptionType } from '../app/types';

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


// Edition
const getEditions = async (token?: string) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/edition/getAll`, { withCredentials: true, params: { token } })
        return Array.isArray(res.data) ? res.data : []
    } catch (err) { console.error(err) }
}

const getEditionById = async (_id: string, token?: string) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/edition/getById`, { params: { _id, token }, withCredentials: true })
        return res.data
    } catch (err) { console.error(err) }
}

const getEditionByTitle = async (title: string) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/edition/getByTitle`, { params: { title }, withCredentials: true })
        return res.data
    } catch (err) { console.error(err) }
}

const createEdition = async (data: editionType, token?: string) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/edition/create`, data, { withCredentials: true, params: { token } })
        return res.data
    } catch (err) { console.error(err) }
}

const updateEdition = async (data: editionType, token?: string) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/edition/update`, data, { withCredentials: true, params: { token } })
        return res.data
    } catch (err) { console.error(err) }
}

const sendTestEdition = async (data: editionType, token?: string) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/edition/sendTest`, data, { withCredentials: true, params: { token } })
        return res.data
    } catch (err) { console.error(err) }
}

// Subscriptions
const getAllEmails = async (token?: string) => {
    try {
        const res = await axios.get(`${BASE_URL}/api/app/getEmails`, { withCredentials: true, params: { token } })
        return res.data
    } catch (err) { console.error(err) }
}

const subscribeEmail = async (data: dataObj) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/app/subscribe`, data)
        return response.data
    } catch (err) { console.error(err) }
}

const updateSubscription = async (data: subscriptionType) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/app/updateSubscription`, data)
        return res.data
    } catch (err) { console.error(err) }
}

const unsubscribeByEmail = async (data: subscriptionType) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/app/unsubscribeByEmail`, data)
        return res.data
    } catch (err) { console.error(err) }
}

const sendUnsubscriptionEmail = async (data: subscriptionType) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/app/sendUnsubscriptionEmail`, data)
        return res.data
    } catch (err) { console.error(err) }
}

const sendNewsletter = async (data: dataObj, token?: string) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/edition/sendCampaign`, data, { withCredentials: true, params: { token } })
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
    subscribeEmail,
    getAllEmails,
    updateSubscription,
    unsubscribeByEmail,
    sendUnsubscriptionEmail,
    sendNewsletter,

    loginUser,
    verifyToken,
    registerUser,
    updateUser,
    logOut,

    getEditions,
    getEditionById,
    getEditionByTitle,
    createEdition,
    updateEdition,
    sendTestEdition,
}