import React, { useContext, useState } from 'react'
import Navbar from '../../components/navigation'
import Footer from '../../components/footer'
import styles from './index.module.css'
import { Link } from 'react-router-dom'
import UserContext from '../../Context'
import changeHandler from '../../utils/validation/change'
import { useHistory } from 'react-router-dom'
const AccountSettings = () => {
    const context = useContext(UserContext)
    const history = useHistory()

    const [image, setImage] = useState({
        value: '',
        errorMsg: ''
    })

    const [money, setMoney] = useState({
        value: '',
        errorMsg: ''
    })

    const [email, setEmail] = useState({
        value: '',
        errorMsg: ''
    })

    const [subscribe, setSubscribe] = useState({
        value: {},
        errorMsg: ''
    })

    const handleClick = async (obj, type) => {
        const objValue = obj.value
        const request = await fetch(`http://localhost:9999/api/user/${context.user.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                [`${type}`]: objValue
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const response = await request.json()
        console.log(response)
        history.push('/account-info')
    }

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
                    <h2>{context.user.image ? 'Change profile picture' : 'Add profile picture'}</h2>
                    <div className={styles.changeInput}>
                        <input placeholder="Image url..."
                            type="text"
                            value={image.value}
                            onChange={(e) => setImage({ ...changeHandler(e, 'link', image) })} />
                        <button className={styles.submit}
                            onClick={() => handleClick(image, 'image')}>
                            Change photo
                        </button>

                    </div>

                </div>
                <div className={styles.option}>
                    <h2>Deposit money: </h2>
                    <div className={styles.changeInput}>
                        <input placeholder="00.00$"
                            type="text"
                            value={money.value}
                            onChange={(e) => { setMoney({ ...changeHandler(e, 'money', money) }) }} />
                        <button className={styles.submit}
                        onClick={() => handleClick(money, 'money')}
                        >
                            Deposit
                        </button>
                    </div>
                </div>
                <div className={styles.option}>
                    <h2>{context.user.email ? 'Change email: ' : 'Add email: '}</h2>
                    <div className={styles.changeInput}>
                        <input placeholder="Email"
                            type="text"
                            value={email.value}
                            onChange={(e) => { setEmail({ ...changeHandler(e, 'email', email) }) }}></input>
                        <button className={styles.submit}
                            onClick={() => handleClick(email, 'email')}>
                            Submit email
                        </button>
                    </div>
                </div>

                <div className={styles.option}>
                    <h2>Get notified about: </h2>
                    <div className={styles.formContent}>
                        <form>
                            <input className={styles.formInput} type="checkbox" id="Donations" />
                            <label htmlFor="Donations">Donations</label>
                            <input className={styles.formInput} type="checkbox" id="Campaigns" />
                            <label htmlFor="Campaigns">Campaigns</label>
                            <input className={styles.formInput} type="checkbox" id="Product development" />
                            <label htmlFor="Product development">Product development</label>
                            <input className={styles.formInput} type="checkbox" id="Startups" />
                            <label htmlFor="Startups">Startups</label>
                        </form>
                        <button type="submit" className={styles.formSubmit}>Subscribe</button>
                    </div>
                </div>
            </div>

            <div className={styles.disclaimer}>
                <p>
                    Note: Subscribing for notifications with
                    empty values resets the user's subscriptions
                    to none.
                            </p>
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