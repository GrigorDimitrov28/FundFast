import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/navigation'
import Footer from '../../components/footer'
import styles from './index.module.css'
import { Link } from 'react-router-dom'
import UserContext from '../../Context'
const AccountInfo = () => {
    const context = useContext(UserContext)
    const [user, setUser] = useState({})
    const [isLoaded, setLoaded] = useState(false)
    const defaultImageLink = 'https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'

    useEffect(() => {
        fetch(`http://localhost:9999/api/user?id=${context.user.id}`).then(data => data.json())
            .then(response => {
                response.money = response.money.toFixed(2)

                setUser(response)
                setLoaded(true)
            })
            .catch(err => console.log(err))
    }, [context.user.id])

    return (
        <div className={styles.content}>
            <div className={styles.internalNav}>
                <Link to={'/account-info'}
                    className={styles.activeLink}>My profile</Link>
                <Link to={'/account-settings'}
                    className={styles.internalLink}>Settings</Link>
                <Link to={'/'} className={styles.internalLink}>Fundraisers</Link>
                <Link to={'/'} className={styles.internalLink}>Blog posts</Link>
            </div>
            <div className={styles.mainContent}>
                <div className={styles.leftContent}>
                    <h1>{user.username}</h1>
                    <h3>{user.email}</h3>
                    <img className={user.image ? styles.profilePicture : styles.defaultProfilePicture}
                        src={isLoaded ? (user.image ? user.image : defaultImageLink) : ''}
                        alt="profile" />
                </div>
                <div className={styles.rightContent}>
                    <h2>My stats: </h2>
                    <div className={styles.stats}>
                        <p>0 Fundraisers</p>
                        <p>0 Blog posts</p>
                        <p>0 Dollars donated</p>
                    </div>
                    <h2>Balance: </h2>
                    <h1>{user.money} USD</h1>
                </div>
            </div>
        </div>
    )
}
const ProfilePage = () => {
    return (
        <div>
            <Navbar />
            <AccountInfo />
            <Footer />
        </div>
    )
}

export default ProfilePage