import React, { useState, useContext } from 'react'
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
import FacebookLoginWithButton from 'react-facebook-login'

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

    const [isProcessing, setProcessing] = useState(false)

    const context = useContext(UserContext)
    const history = useHistory()

    const responseFacebook = (response) => {
        const { name, email, picture, id, accessToken } = response;
        const user = {
            name, 
            email,
            picture,
            id
        }
        if(response.status !== "unknown" && response.status !== "not_authorized"){
            document.cookie = `fb-auth-token=${accessToken}`
            context.logIn(user)
            history.push('/')
        }
    }
    async function handleSubmit(e, username, password){
        e.preventDefault()
        setProcessing(true)

        await authenticate('http://localhost:9999/api/user/register', {
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
                <h2 className={styles.login}>Sign up</h2>
                <form className={styles.loginForm} onSubmit={(e) => handleSubmit(e, user.value, password.value)}>
                    <Input name="username"
                        type="text"
                        placeholder="Username"
                        value={user.value}
                        onBlur={() => setUser({...handleBlurUsername(user)})}
                        onChange={(e) => setUser({...handleChange(e, 'user', user)})}/>
                    <p className={styles.error}> {user.errorMsg} </p>

                    <Input name="password"
                        type="text"
                        placeholder="Password"
                        value={password.value}
                        onBlur={() => setPassword({...handleBlurPassword(password)})}
                        onChange={(e) => setPassword({...handleChange(e, 'password', password)})} />
                    <p className={styles.error}> {password.errorMsg} </p>

                    <Input name="rePassword"
                        type="text"
                        placeholder="Repeat password"
                        value={rePassword.value}
                        onBlur={() => setRePassword({...handleBlurRePassword(rePassword, password)})}
                        onChange={(e) => setRePassword({...handleChange(e, 'rePassword', rePassword, password.value)})} />
                    <p className={styles.error}> {rePassword.errorMsg} </p>

                    <button type="submit"
                        disabled={user.errorMsg
                            || password.errorMsg
                            || rePassword.errorMsg
                            || isProcessing
                            || !user.value
                            || !password.value
                            || !rePassword.value}
                        className={styles.submit}>
                        Sign Up
                        </button>
                </form>
                <div className={styles.or}>
                    <hr />
                        or
                        <hr />
                </div>
                <FacebookLoginWithButton
                    icon="fa-facebook"
                    textButton={"Continue with Facebook"}
                    cssClass={styles.facebook}
                    appId="298915014500855"
                    fields="name,email,picture"
                    callback={responseFacebook} />
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