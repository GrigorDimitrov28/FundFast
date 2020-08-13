import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './index.module.css'
import Navbar from '../../components/navigation'
import Footer from '../../components/footer'
import Input from '../../components/input'
import { Link } from 'react-router-dom'
import handleBlurUsername from '../../utils/validation/username'
import handleBlurPassword from '../../utils/validation/password'
import handleBlurRePassword from '../../utils/validation/rePassword'
import handleChange from '../../utils/validation/change'
import authenticate from '../../utils/auth/auth'
import UserContext from '../../Context'

const RegisterForm = () => {
    const [user, setUser] = useState({
        value: '',
        errorMsg: ''
    })

    const [password, setPassword] = useState({
        value: '',
        errorMsg: ''
    })

    const [rePassword, setRePassword] = useState({
        value: '',
        errorMsg: ''
    })
    const [isButtonDisabled, setDisabled] = useState(true)
    const [isProcessing, setProcessing] = useState(false)

    const context = useContext(UserContext)
    const history = useHistory()
    async function handleSubmit(e, username, pass, rePass) {
        e.preventDefault()
        setProcessing(true)

        const auth = await authenticate('http://localhost:9999/api/user/register', {
            username,
            password: pass,
            rePassword: rePass
        }, (user) => {
            context.logIn(user)
            history.push('/')
        }, (err) => {
            console.log('Error', err)
            setProcessing(false)
        }, () => {
            history.push('/500')
        })

        if(auth && (auth.usernameError || auth.passwordError || auth.rePasswordError)){
            setUser({ ...user, errorMsg: auth.usernameError })
            setPassword({ ...password, errorMsg: auth.passwordError })
            setRePassword({ ...rePassword, errorMsg: auth.rePasswordError })
            setProcessing(false)
        }
    }
    
    useEffect(() => {
        if(user.value && password.value && rePassword.value
            && !user.errorMsg && !password.errorMsg && !rePassword.errorMsg
            && !isProcessing) {
                setDisabled(false)
            }
    }, [user, password, rePassword, isProcessing])

    return (
        <div className={styles.wrapper}>
            <div className={styles.loginWrapper}>
                <h2 className={styles.login}>Sign up</h2>
                <form className={styles.loginForm} onSubmit={(e) => handleSubmit(e, user.value, password.value, rePassword.value)}>
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

                    <Input name="rePassword"
                        type="text"
                        placeholder="Repeat password"
                        value={rePassword.value}
                        onBlur={() => setRePassword({ ...handleBlurRePassword(rePassword, password) })}
                        onChange={(e) => setRePassword({ ...handleChange(e, 'rePassword', rePassword, password.value) })} />
                    <p className={styles.error}> {rePassword.errorMsg} </p>

                    <button type="submit"
                        disabled={isButtonDisabled}
                        className={styles.submit}>
                        Sign Up
                        </button>
                </form>
                <div className={styles.or}>
                    <hr />
                        or
                        <hr />
                </div>
                <div className={styles.new}>
                    <p>Already a member?</p>
                    <Link to={'/login'} className={styles.register}>Sign In</Link>
                </div>
            </div>
        </div>
    )

}

const LazyRegisterPage = () => {

    return (
        <div className="container">
            <Navbar />
            <RegisterForm />
            <Footer />
        </div>
    )
}

export default LazyRegisterPage;