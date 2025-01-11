import React from 'react'
import { HashLoader } from 'react-spinners'

type Props = {
    color?: string
    label?: string
    style?: React.CSSProperties
}

export default function Loader({ label, color, style }: Props) {
    return (
        <div className='loader__container' style={style}>
            <HashLoader color={color || '#2fc4b2'} />
            {label ? <p style={{ color }}>{label}</p> : ''}
        </div>
    )
}