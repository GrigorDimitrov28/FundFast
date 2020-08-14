import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Input from '../../components/input'
import styles from './index.module.css'
import { Link } from 'react-router-dom'
import * as validator from '../../utils/validation'
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
    const [isButtonDisabled, setDisabled] = useState(true)

    const context = useContext(UserContext)
    const history = useHistory()
    async function handleSubmit(e, username, pass) {
        e.preventDefault()
        setProcessing(true)
        
        const auth = await authenticate('http://localhost:9999/api/user/login', {
            username,
            password: pass
        }, (user) => {
            context.logIn(user)
            history.push('/')
        }, (err) => {
            console.log('Error', err)
            setProcessing(false)
        }, () => {
            history.push('/500')
        })
        if(auth && (auth.usernameError || auth.passwordError)){
            setUser({ ...user, errorMsg: auth.usernameError })
            setPassword({ ...password, errorMsg: auth.passwordError })
            setProcessing(false)
        }
    }

    useEffect(() => {
        if(user.value && password.value && !user.errorMsg && !password.errorMsg
            && !isProcessing){
                setDisabled(false)
            }
    }, [user, password, isProcessing])

    return (
        <div className={styles.wrapper}>
            <div className={styles.loginWrapper}>
                <h2 className={styles.login}>Sign In</h2>
                <form className={styles.loginForm} onSubmit={(e) => handleSubmit(e, user.value, password.value)}>
                    <Input name="username"
                        className="loginInput"
                        type="text"
                        placeholder="Username"
                        value={user.value}
                        onBlur={() => setUser({ ...validator.username(user) })}
                        onChange={(e) => setUser({ ...validator.change(e, 'user', user) })} />
                    <p className={styles.error}> {user.errorMsg} </p>

                    <Input name="password"
                        type="text"
                        className="loginInput"
                        placeholder="Password"
                        value={password.value}
                        onBlur={() => setPassword({ ...validator.password(password) })}
                        onChange={(e) => setPassword({ ...validator.change(e, 'password', password) })} />
                    <p className={styles.error}> {password.errorMsg} </p>

                    <button type="submit"
                        disabled={isButtonDisabled}
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
            <LoginForm />
        </div>
    )
}

export default LazyLoginPage;