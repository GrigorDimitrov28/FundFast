import React from 'react'
import styles from './index.module.css'
// import styles from './index.module.css'
const Input = ({ type, name, placeholder, onBlur , onChange, value}) => {
    return (
        <input className={styles.input} 
        type={type} 
        name={name} 
        placeholder={placeholder} 
        onBlur={onBlur} 
        value={value} 
        onChange={onChange}/>
    )
}

export default Input