import React from 'react'
// import styles from './index.module.css'
const Input = ({ name, placeholder, onBlur , onChange, value}) => {
    return (
        <input type="text" name={name} placeholder={placeholder} onBlur={onBlur} value={value} onChange={onChange}/>
    )
}

export default Input