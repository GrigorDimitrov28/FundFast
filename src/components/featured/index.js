import React, { useState } from 'react';
import styles from './index.module.css';
import Card from '../fund-card';



const Featured = () => {
    const [current, setCurrent] = useState('Donations')

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
                <button className={current === 'Donations' ? styles.active : styles.button}
                 onClick={(e) => setCurrent('Donations')}>Donations</button>

                <button className={current === 'Campaigns' ? styles.active : styles.button}
                 onClick={(e) => setCurrent('Campaigns')}>Campaigns</button>

                <button className={current === 'Product development' ? styles.active : styles.button}
                 onClick={(e) => setCurrent('Product development')}>Product development</button>

                <button className={current === 'Startups' ? styles.active : styles.button}
                 onClick={(e) => setCurrent('Startups')}>Startups</button>
            </div>

            <div className={styles.current}>
                <CurrentFeatured />
            </div>
        </div>
    )


}

export default Featured