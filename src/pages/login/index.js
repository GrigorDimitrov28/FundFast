import React, { Component } from 'react'

import Navbar from '../../components/navigation'
import Footer from '../../components/footer'
import Input from '../../components/input'
import styles from './index.module.css'
import { Link } from 'react-router-dom'
class LoginForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.loginWrapper}>
                    <h2 className={styles.login}>Sign In</h2>
                    <form className={styles.loginForm}>
                        <Input name="email" placeholder="Email" />
                        <Input name="password" placeholder="Password" />
                        <button type="submit" className={styles.submit}>
                            Sign In
                        </button>
                    </form>
                    <div className={styles.or}>
                        <hr />
                        or
                        <hr />
                    </div>
                    <button className={styles.submit}>
                        Sign in with Google
                    </button>
                    <button className={styles.submit}>
                        Sign in with Facebook
                    </button>
                    <div className={styles.new}>
                        <p>New to FundFast?</p>
                        <Link className={styles.register}>Sign Up</Link>
                    </div>
                </div>
            </div>
        )
    }
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