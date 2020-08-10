import React, { useContext } from 'react'
import Navbar from '../../components/navigation'
import Footer from '../../components/footer'
import styles from './index.module.css'
import { Link } from 'react-router-dom'
import UserContext from '../../Context'
const AccountInfo = () => {
    const context = useContext(UserContext)

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
                    <h1>{context.user.username}</h1>
                    <img className={context.profilePicture ? styles.profilePicture : styles.defaultProfilePicture} 
                    src={context.profilePicture ? context.profilePicture : 'https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg'}/>
                </div>
                <div className={styles.rightContent}>
                    <h2>My stats: </h2>
                    <div className={styles.stats}>
                        <p>0 Fundraisers</p>
                        <p>0 Blog posts</p>
                        <p>0 Dollars donated</p>
                    </div>
                    <h2>Balance: </h2>
                    <h1>0.00 USD</h1>
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