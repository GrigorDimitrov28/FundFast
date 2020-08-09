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
                category: 'Donations'
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => {
            return promise.json()
        }).then(response => {
            setFeatured(response.splice(0, 4))
            setLoaded(true)
        })
        return setLoaded(false)
    }, [])

    const handleClick = (e) => {
        setLoaded(false)
        if(e.target.textContent !== current) {
            setCurrent(e.target.textContent)

            fetch('http://localhost:9999/api/fundraiser/featured', {
            method: 'POST',
            body: JSON.stringify({
                category: e.target.textContent
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(promise => {
            return promise.json()
        }).then(response => {
            setFeatured(response.splice(0, 4))
            setLoaded(true)
        })
        }
    }

    return (
        <div className={styles.featured}>
            <div className={styles.buttons}>
                <h2>Featured</h2>
                <button className={current === 'Donations' ? styles.active : styles.button}
                    onClick={(e) => handleClick(e)}>Donations</button>

                <button className={current === 'Campaigns' ? styles.active : styles.button}
                    onClick={(e) => handleClick(e)}>Campaigns</button>

                <button className={current === 'Product development' ? styles.active : styles.button}
                    onClick={(e) => handleClick(e)}>Product development</button>

                <button className={current === 'Startups' ? styles.active : styles.button}
                    onClick={(e) => handleClick(e)}>Startups</button>
            </div>
            
            <div className={styles.current}>
                {!isLoaded && <h2 className={styles.noPosts}>Loading...</h2>}
                {isLoaded && featured.length === 0 && <h2 className={styles.noPosts}>No fundraisers yet.</h2>}
                {isLoaded && featured.map(data => <Card key={data._id}
                description={data.description.slice(0, 150)}
                category={data.category}
                name={data.name}
                image={data.image}/>)}
            </div>
        </div>
    )

}

export default Featured