"use client";

import React, { createContext, useEffect, useState } from 'react'
import { AppContextType } from '../types'
import { verifyToken } from '../../services'
import { getUser } from '../../helpers'

export const AppContext = createContext<AppContextType>({
    isMobile: false,
    isLoggedIn: null,
    setIsLoggedIn: () => { }
})

type Props = {
    children?: React.ReactNode
}

export const AppProvider = ({ children }: Props) => {
    const [isMobile, setIsMobile] = useState<boolean>(false)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
    const [darkMode, setDarkMode] = useState(false)
    const [windowLoading, setWindowLoading] = useState(true)

    useEffect(() => {
        if (window && localStorage) setWindowLoading(false)
        setDarkMode(JSON.parse(localStorage.getItem('preferredMode') || 'false'))
        setIsMobile(isMobileDevice())

        verifyUser()

        const checkWidth = () => setIsMobile(window.innerWidth <= 768)

        window.addEventListener("resize", checkWidth)
        return () => window.removeEventListener("resize", checkWidth)
    }, [])

    const isMobileDevice = () => {
        if (typeof window === 'undefined') return false // Server-side check

        const width = window.innerWidth
        const userAgent = window.navigator.userAgent.toLowerCase()

        const mobileKeywords = [
            'android', 'webos', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone'
        ]

        const isMobile = mobileKeywords.some(keyword => userAgent.includes(keyword))
        const isSmallScreen = width <= 768

        return isMobile || isSmallScreen
    }

    const verifyUser = async () => {
        try {
            const verified = await verifyToken(getUser().token)
            if (verified && verified.token) {
                setIsLoggedIn(true)
            } else setIsLoggedIn(false)
        } catch (error) {
            setIsLoggedIn(false)
        }
    }

    const contextValue = React.useMemo(() => ({
        isMobile,
        setIsLoggedIn,
        isLoggedIn
    }), [
        isMobile,
        setIsLoggedIn,
        isLoggedIn
    ])


    return windowLoading ? null : <AppContext.Provider value={contextValue}>
        {children}
    </AppContext.Provider>
}