import React, { Component } from 'react'

import styles from './index.module.css'
import Navbar from '../../components/navigation'
import Footer from '../../components/footer'
import Input from '../../components/input'
import { Link } from 'react-router-dom'

class RegisterForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.loginWrapper}>
                    <h2 className={styles.login}>Sign up</h2>
                    <form className={styles.loginForm}>
                        <Input name="username" placeholder="Username" />
                        <Input name="email" placeholder="Email" />
                        <Input name="password" placeholder="Password" />
                        <Input name="rePassword" placeholder="Repeat password" />
                        <button type="submit" className={styles.submit}>
                            Sign Up
                        </button>
                    </form>
                    <div className={styles.or}>
                        <hr />
                        or
                        <hr />
                    </div>
                    <button className={styles.submit}>
                        Sign up with Google
                    </button>
                    <button className={styles.submit}>
                        Sign up with Facebook
                    </button>
                    <div className={styles.new}>
                        <p>Already a member?</p>
                        <Link className={styles.register}>Sign In</Link>
                    </div>
                </div>
            </div>
        )
    }
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