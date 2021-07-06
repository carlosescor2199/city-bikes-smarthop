import React from 'react'
import './Button.css'

export default function Button({ onClick, message }) {
    return (
        <button className="btn" onClick={onClick}>{message}</button>
    )
}
