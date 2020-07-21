import React, { useState } from 'react';
import styles from './index.module.css';
import Card from '../fund-card';



const Featured = () => {
    const [current, setCurrent] = useState('Donations');

    const data = {
        'Donations': <div className={styles.cards}>
            <Card />
            <Card />
            <Card />
            <Card />
        </div>,
        'Campaigns': <div className={styles.cards}>
            <Card />
        </div>,
        'Product development': <div className={styles.cards}>
            <Card />
            <Card />

        </div>,
        'Startups': <div className={styles.cards}>
            <Card />
            <Card />
            <Card />
        </div>
    }

    const CurrentFeatured = () => {
        return (
            data[current]
        )
    }

    return (
        <div className={styles.featured}>
            <div className={styles.buttons}>
                <h2>Featured</h2>
                <button className={styles.button} onClick={() => setCurrent('Donations')}>Donations</button>
                <button className={styles.button} onClick={() => setCurrent('Campaigns')}>Campaigns</button>
                <button className={styles.button} onClick={() => setCurrent('Product development')}>Product development</button>
                <button className={styles.button} onClick={() => setCurrent('Startups')}>Startups</button>
            </div>

            <div className={styles.current}>
                <CurrentFeatured />
            </div>
        </div>
    )


}

export default Featured;