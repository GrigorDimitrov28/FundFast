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
                    <div className={styles.changeInput}>
                        <input placeholder="Image url..."></input>
                        <button className={styles.submit}>
                            Change photo
                        </button>
                    </div>

                </div>
                <div className={styles.option}>
                    <h2>Deposit money: </h2>
                    <div className={styles.changeInput}>
                        <input placeholder="00.00$"></input>
                        <button className={styles.submit}>
                            Deposit
                        </button>
                    </div>
                </div>
                <div className={styles.option}>
                    <h2>{context.email ? 'Change email: ' : 'Add email: '}</h2>
                    <div className={styles.changeInput}>
                        <input placeholder="Email"></input>
                        <button className={styles.submit}>
                            Submit email
                        </button>
                    </div>
                </div>
                <div className={styles.option}>
                    <h2>Get notified about: </h2>
                    <div className={styles.formInput}>
                        <form>
                            <input type="checkbox" id="Donations" />
                            <label htmlFor="Donations">Donations</label>
                            <input type="checkbox" id="Campaigns" />
                            <label htmlFor="Campaigns">Campaigns</label>
                            <input type="checkbox" id="Product development" />
                            <label htmlFor="Product development">Product development</label>
                            <input type="checkbox" id="Startups" />
                            <label htmlFor="Startups">Startups</label>
                        </form>
                        <button className={styles.formSubmit}>Subscribe</button>
                    </div>
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