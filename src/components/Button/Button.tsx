import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../app/context/AppContext'
import { isTooBright } from '../../helpers'
import Image from 'next/image'
import { PuffLoader, ScaleLoader, SyncLoader } from 'react-spinners'

type Props = {
    label?: string
    className?: string
    bgColor?: string
    textColor?: string
    handleClick: () => any
    disabled?: boolean
    svg?: string
    style?: React.CSSProperties
    loading?: boolean
    outline?: boolean
}

export default function Button(props: Props) {
    const {
        label,
        handleClick,
        className,
        bgColor,
        textColor,
        disabled,
        svg,
        style,
        loading,
        outline
    } = props

    const [buttonStyle, setButtonStyle] = useState<React.CSSProperties>({ ...style })

    return svg ?
        <div
            className="button__icon"
            onClick={handleClick}
            style={{
                backgroundColor: bgColor || '',
                border: `1px solid ${outline ? textColor : bgColor || ''}`,
                color: textColor || 'black',
                opacity: disabled ? '.3' : '',
                padding: '.2vw',
                cursor: disabled ? 'not-allowed' : '',
                display: 'flex',
                flexDirection: 'row',
                minHeight: '2rem',
                alignItems: 'center',
                gap: '.5rem',
                paddingInline: '.5rem',
                ...buttonStyle
            }}
            onMouseEnter={() => setButtonStyle({
                ...style,
                backgroundColor: outline ? textColor : 'transparent',
                color: outline ? bgColor : isTooBright(bgColor) ? 'black' : bgColor
            })}
            onMouseLeave={() => setButtonStyle({
                ...style,
                backgroundColor: bgColor || '',
                color: textColor || 'black',
            })}
        >
            <img src={svg} alt="Button" className='button__svg' />
            {label || ''}
        </div>
        :
        loading ?
            <div className="button__default-loader">
                <SyncLoader size={6} color='#2fc4b2' />
            </div>
            :
            <button
                className={className || 'button__default'}
                onClick={handleClick}
                style={{
                    backgroundColor: bgColor || '',
                    border: `1px solid ${outline ? textColor : bgColor || ''}`,
                    color: !textColor ? 'lightgray' : textColor || 'black',
                    opacity: disabled ? '.3' : '',
                    cursor: disabled ? 'not-allowed' : '',
                    ...buttonStyle
                }}
                disabled={disabled}
                onMouseEnter={() => setButtonStyle({
                    ...style,
                    backgroundColor: outline ? textColor : 'transparent',
                    color: bgColor || ''
                })}
                onMouseLeave={() => setButtonStyle({
                    ...style,
                    backgroundColor: bgColor || '',
                    color: textColor || 'black',
                })}
            >
                {label || ''}
            </button>
}