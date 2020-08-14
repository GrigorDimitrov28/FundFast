import React, { useEffect, useState } from 'react'
import styles from './index.module.css'

const Stats = () => {
    const [stats, setStats] = useState({})

    useEffect(() => {
        async function getStats () {
            const request = await fetch('http://localhost:9999/api/website/statistics')
            const data = await request.json()
            console.log(data)
        }

        getStats()
    }, [])

    return (
        <div className={styles.content}>
            <h2 className={styles.name}>Our stats</h2>
            <div className={styles.imgContent}>
                <img className={styles.statPhoto} src="./users.png" alt="users-registered" />
                <h3 className={styles.dynamic}>0 Users</h3>
                <img className={styles.statPhoto} src="./funds.png" alt="funds-raised" />
                <h3 className={styles.dynamic}>0$ raised</h3>
                <img className={styles.statPhoto} src="./projects.png" alt="projects-completed" />
                <h3 className={styles.dynamic}>0 projects funded</h3>
                <img className={styles.statPhoto} src="./blog.png" alt="blog-posts" />
                <h3 className={styles.dynamic}>0 blog posts</h3>
                <img className={styles.statPhoto} src="./active.png" alt="fundraisers-active" />
                <h3 className={styles.dynamic}>0 active fundraisers</h3>
            </div>
        </div>
    )
}

export default Stats