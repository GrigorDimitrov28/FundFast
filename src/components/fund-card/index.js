import React from 'react'
import styles from './index.module.css'
import { Link } from 'react-router-dom'

const Card = (image, name, category, description) => {
    return (
        <div className={styles.card}>
            <Link to={'/details'}>
                <img src={image} alt="Avatar" />
            </Link>
            <div className={styles.container}>
                <h3><b>{name}</b></h3>
                <h4>{category}</h4>
                <p>{description}</p>
                <a href="/details">Details</a>
            </div>
        </div>
    )
}

export default Card;