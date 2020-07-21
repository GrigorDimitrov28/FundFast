import React from 'react';
import styles from './index.module.css';
const Link = ({ text, type, href }) => {
    return (
        <a className={styles[type]} href={href}> {text} </a>
    )
}

export default Link;