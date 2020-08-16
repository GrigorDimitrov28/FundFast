import React, { useContext, useState, useEffect } from 'react'
import styles from './index.module.css'
import { Link } from 'react-router-dom'
import UserContext from '../../Context'
import { useHistory } from 'react-router-dom'
import * as validator from '../../utils/validation'
import Input from '../../components/input'

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

    const [isProcessing, setProcessing] = useState(false)
    const [isMoneyButtonDisabled, setMoneyDisabled] = useState(true)
    const [isEmailButtonDisabled, setEmailDisabled] = useState(true)
    const [isImageButtonDisabled, setImageDisabled] = useState(true)

    useEffect(() => {
        if (money.value && !money.errorMsg && !isProcessing) {
            setMoneyDisabled(false)
        }
    }, [money, isProcessing])
    useEffect(() => {
        if (email.value && !email.errorMsg && !isProcessing) {
            setEmailDisabled(false)
        }
    }, [email, isProcessing])
    useEffect(() => {
        if (image.value && !image.errorMsg && !isProcessing) {
            setImageDisabled(false)
        }
    }, [image, isProcessing])
    const handleClick = async (obj, type) => {
        setProcessing(true)
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
        if (response.imageError || response.emailError || response.moneyError) {
            setImage({ ...image, errorMsg: response['imageError'] })
            setEmail({ ...email, errorMsg: response['emailError'] })
            setMoney({ ...money, errorMsg: response['moneyError'] })
            setProcessing(false)
        } else {
            context.user.money = response.money
            history.push('/account-info')
        }
    }

    return (
        <div className={styles.content}>
            <div className={styles.internalNav}>
                <Link to={'/account-info'}
                    className={styles.firstInternalLink}>My profile</Link>
                <Link to={'/account-settings'}
                    className={styles.activeLink}>Settings</Link>
                <Link to={'/account-fundraisers'} className={styles.internalLink}>Fundraisers</Link>
                <Link to={'/account-blogs'} className={styles.internalLink}>Blog posts</Link>
            </div>
            <div className={styles.options}>
                <div className={styles.option}>
                    <h2>Add profile picture: </h2>
                    <div className={styles.changeInput}>
                        <div className={styles.e}>
                            <Input placeholder="Image url..."
                                className="loginInput"
                                type="text"
                                value={image.value}
                                onChange={(e) => setImage({ ...validator.change(e, 'link', image) })}
                                onBlur={() => setImage({ ...validator.link(image) })} />
                            <p>{image.errorMsg}</p>
                        </div>
                        <button className={styles.submit}
                            disabled={isImageButtonDisabled}
                            onClick={() => handleClick(image, 'image')}>
                            Change photo
                        </button>

                    </div>

                </div>
                <div className={styles.option}>
                    <h2>Deposit money: </h2>
                    <div className={styles.changeInput}>
                        <div className={styles.e}>
                            <Input placeholder="00.00$"
                                className="loginInput"
                                type="text"
                                value={money.value}
                                onChange={(e) => { setMoney({ ...validator.change(e, 'money', money) }) }}
                                onBlur={() => setMoney({ ...validator.money(money) })} />
                            <p>{money.errorMsg}</p>
                        </div>

                        <button className={styles.submit}
                            onClick={() => handleClick(money, 'money')}
                            disabled={isMoneyButtonDisabled}>
                            Deposit
                        </button>
                    </div>
                </div>
                <div className={styles.option}>
                    <h2>Add email: </h2>
                    <div className={styles.changeInput}>
                        <div className={styles.e}>
                            <Input placeholder="Email"
                                className="loginInput"
                                type="text"
                                value={email.value}
                                onChange={(e) => { setEmail({ ...validator.change(e, 'email', email) }) }}
                                onBlur={() => setEmail({ ...validator.email(email) })} />
                            <p>{email.errorMsg}</p>
                        </div>


                        <button className={styles.submit}
                            disabled={isEmailButtonDisabled}
                            onClick={() => handleClick(email, 'email')}>
                            Submit email
                        </button>
                    </div>
                </div>
            </div>

            <div className={styles.disclaimer}>
                <p>
                    Note: Subscribing for notifications refreshes your current subscription list.
                    Therefore an empty submit unsubscribes you from everything.
                            </p>
            </div>
        </div>
    )
}
const ProfileSettingsPage = () => {
    return (
        <AccountSettings />
    )
}

export default ProfileSettingsPage