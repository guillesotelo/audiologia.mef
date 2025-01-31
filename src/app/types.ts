export type AppContextType = {
    isMobile: boolean
    isLoggedIn: boolean | null
    setIsLoggedIn: (value: boolean) => void
}

export type onChangeEventType = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>

export type dataObj<T = any> = Record<string | number, T>

export type userType = {
    _id?: string
    username?: string
    email?: string
    password?: string
    newData?: { [key: string]: string }
    token?: string
}

export type bookingType = {
    _id?: string
    studyId?: string
    studyName?: string
    firstName?: string
    title?: string
    lastName?: string
    date?: Date | null
    email?: string
    start?: Date | null
    end?: Date | null
    phone?: string | number
    calendarLink?: string
    qr?: string
    age?: Date | number | string
    duration?: number
    otherData?: { [key: string]: string } | string
    createdAt?: Date | number | string
    updatedAt?: Date | number | string
}