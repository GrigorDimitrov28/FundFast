import React from 'react'
import styles from './index.module.css'
import { Link } from 'react-router-dom'

const LinkComponent = ({text, type, href}) => {
    return (
        <Link to={href || ""} className={styles[type]}>
            {text}
        </Link>
    )
}

export default LinkComponent;