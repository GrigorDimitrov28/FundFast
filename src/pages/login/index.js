import React, { Component } from 'react'

import Navbar from '../../components/navigation'
import Footer from '../../components/footer'
import Input from '../../components/input'
import styles from './index.module.css'
import { Link } from 'react-router-dom'
import handleBlurUsername from '../../utils/validation/username'
import handleBlurPassword from '../../utils/validation/password'
import handleChange from '../../utils/validation/change'

class LoginForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: "",
            rePassword: "",
            usernameErrorMsg: "",
            passwordErrorMsg: "",
            usernameErrorIsHidden: true,
            passwordErrorIsHidden: true
        }
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.loginWrapper}>
                    <h2 className={styles.login}>Sign In</h2>
                    <form className={styles.loginForm}>
                        <Input name="username"
                            placeholder="Username"
                            value={this.state.username}
                            onBlur={() => this.setState(handleBlurUsername(this.state.username))}
                            onChange={(e) => this.setState(handleChange(e, 'username'))} />
                        <p className={styles.error} hidden={this.state.usernameErrorIsHidden}> {this.state.usernameErrorMsg} </p>

                        <Input name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onBlur={() => this.setState(handleBlurPassword(this.state.password))}
                            onChange={(e) => this.setState(handleChange(e, 'password'))} />
                        <p className={styles.error} hidden={this.state.passwordErrorIsHidden}> {this.state.passwordErrorMsg} </p>

                        <button type="submit"
                            disabled={this.state.usernameErrorIsHidden === false || this.state.passwordErrorIsHidden === false} className={styles.submit}>
                            Sign Up
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
                        <Link to={'/register'} className={styles.register}>Sign Up</Link>
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