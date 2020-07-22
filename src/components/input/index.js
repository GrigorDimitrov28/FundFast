import React from 'react'
// import styles from './index.module.css'
const Input = ({ name, placeholder }) => {
    return (
        <input type="text" name={name} placeholder={placeholder} />
    )
}

export default Input