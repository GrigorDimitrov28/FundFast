import React from 'react';
import styles from './index.module.css';
const Card = () => {
    return (
        <div className={styles.card}>
            <img src="https://image.shutterstock.com/image-photo/highquality-headphones-on-white-background-600w-1574611990.jpg" alt="Avatar"/>
                <div className={styles.container}>
                    <h4><b>John Doe</b></h4>
                    <p>Architect & Engineer</p>
                </div>
        </div>
    )
}

export default Card;