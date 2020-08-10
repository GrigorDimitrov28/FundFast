import React, { useContext } from 'react'
import Navbar from '../../components/navigation'
import Footer from '../../components/footer'
import styles from './index.module.css'
import { Link } from 'react-router-dom'
import UserContext from '../../Context'
const AccountSettings = () => {
    const context = useContext(UserContext)

    return (
        <div className={styles.content}>
            <div className={styles.internalNav}>
                <Link to={'/account-info'}
                    className={styles.firstInternalLink}>My profile</Link>
                <Link to={'/account-settings'}
                    className={styles.activeLink}>Settings</Link>
                <Link to={'/'} className={styles.internalLink}>Fundraisers</Link>
                <Link to={'/'} className={styles.internalLink}>Blog posts</Link>
            </div>
            <div className={styles.options}>
                <div className={styles.option}>
                    <h2>Change profile picture: </h2>
                    <input placeholder="Image url..."></input>
                </div>
                <div className={styles.option}>
                    <h2>Deposit money: </h2> 
                    <input placeholder="00.00$"></input>
                </div>
                <div className={styles.option}>
                    <h2>Add email: </h2>
                    <input placeholder="Email"></input>
                </div>
                <div className={styles.option}>
                    <h2>Get notified about: </h2>
                    <button>Donations</button>
                    <button>Campaigns</button>
                    <button>Product development</button>
                    <button>Startups</button>
                </div>
            </div>
        </div>
    )
}
const ProfileSettingsPage = () => {
    return (
        <div>
            <Navbar />
            <AccountSettings />
            <Footer />
        </div>
    )
}

export default ProfileSettingsPage