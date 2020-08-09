import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Navbar from '../../components/navigation'
import Footer from '../../components/footer'
import Input from '../../components/input'
import styles from './index.module.css'
import { Link } from 'react-router-dom'
import handleBlurUsername from '../../utils/validation/username'
import handleBlurPassword from '../../utils/validation/password'
import handleChange from '../../utils/validation/change'
import authenticate from '../../utils/auth/auth'
import UserContext from '../../Context'
const LoginForm = () => {
    const [user, setUser] = useState({
        value: '',
        errorMsg: ''
    })

    const [password, setPassword] = useState({
        value: '',
        errorMsg: ''
    })

    const [isProcessing, setProcessing] = useState(false)

    const context = useContext(UserContext)
    const history = useHistory()
    async function handleSubmit(e, username, password) {
        e.preventDefault()
        setProcessing(true)
        await authenticate('http://localhost:9999/api/user/login', {
            username,
            password
        }, (user) => {
            context.logIn(user)
            history.push('/')
        }, (err) => {
            console.log('Error', err)
            setProcessing(false)
        }, () => {
            history.push('/500')
        })
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.loginWrapper}>
                <h2 className={styles.login}>Sign In</h2>
                <form className={styles.loginForm} onSubmit={(e) => handleSubmit(e, user.value, password.value)}>
                    <Input name="username"
                        type="text"
                        placeholder="Username"
                        value={user.value}
                        onBlur={() => setUser({ ...handleBlurUsername(user) })}
                        onChange={(e) => setUser({ ...handleChange(e, 'user', user) })} />
                    <p className={styles.error}> {user.errorMsg} </p>

                    <Input name="password"
                        type="text"
                        placeholder="Password"
                        value={password.value}
                        onBlur={() => setPassword({ ...handleBlurPassword(password) })}
                        onChange={(e) => setPassword({ ...handleChange(e, 'password', password) })} />
                    <p className={styles.error}> {password.errorMsg} </p>

                    <button type="submit"
                        disabled={user.errorMsg
                            || password.errorMsg
                            || isProcessing
                            || !user.value
                            || !password.value}
                        className={styles.submit}>
                        Sign In
                        </button>
                </form>
                <div className={styles.or}>
                    <hr />
                        or
                        <hr />
                </div>
                <div className={styles.new}>
                    <p>New to FundFast?</p>
                    <Link to={'/register'} className={styles.register}>Sign Up</Link>
                </div>
            </div>
        </div >
    )

}

const LazyLoginPage = () => {
    return (
        <div className="container">
            <Navbar />
            <LoginForm />
            <Footer />
        </div>
    )
}

export default LazyLoginPage;