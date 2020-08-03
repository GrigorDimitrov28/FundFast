import React from 'react'
import styles from './index.module.css'
import { Link } from 'react-router-dom'

const Card = () => {
    return (
        <div className={styles.card}>
            <Link to={'/details'}>
                <img src="https://image.shutterstock.com/image-photo/highquality-headphones-on-white-background-600w-1574611990.jpg" alt="Avatar" />
            </Link>
            <div className={styles.container}>
                <h3><b>John Doe</b></h3>
                <h4>Architect & Engineer</h4>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean luctus pretium velit, quis varius neque. Proin elit nunc, euismod sit.</p>
                <a href="/details">Details</a>
            </div>
        </div>
    )
}

export default Card;