import React, { useState, useEffect } from 'react';
import styles from './index.module.css';
import Card from '../fund-card';


const Featured = () => {
    const [current, setCurrent] = useState('Donations')
    const [featured, setFeatured] = useState([])
    const [isLoaded, setLoaded] = useState(false)

    useEffect(() => {
        fetch('http://localhost:9999/api/fundraiser/featured', {
            method: 'POST',
            body: JSON.stringify({
                category: current
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(data => {
            setFeatured([1])
        })
        .catch(err => console.error(err))

        console.log(featured)
    }, [])


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

            </div>
        </div>
    )

}

export default Featured