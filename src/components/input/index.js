import React from 'react'
import styles from './index.module.css'
// import styles from './index.module.css'
const Input = ({ className, type, name, placeholder, onBlur , onChange, value}) => {
    return (
        <input className={styles[`${className}`]} 
        type={type} 
        name={name} 
        placeholder={placeholder} 
        onBlur={onBlur} 
        value={value} 
        onChange={onChange}/>
    )
}

export default Input