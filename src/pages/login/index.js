import React, { Component } from 'react'

import Navbar from '../../components/navigation'
import Footer from '../../components/footer'
import Input from '../../components/input'
import styles from './index.module.css'
import { Link } from 'react-router-dom'
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

    handleBlurUsername = () => {
        const usernameRegex = new RegExp("^[a-zA-Z\\d]+$", "g")

        if (this.state.username.length < 4) {
            this.setState({ usernameErrorIsHidden: false, usernameErrorMsg: `Username must be at least 4 characters long.` })
        } else if (this.state.username.length > 15) {
            this.setState({ usernameErrorIsHidden: false, usernameErrorMsg: `Username must be maximum 15 characters long.` })
        } else if (!usernameRegex.test(this.state.username)) {
            this.setState({ usernameErrorIsHidden: false, usernameErrorMsg: `Username can contain only letters and digits.` })
        } else {
            this.setState({ usernameErrorIsHidden: true })
        }

    }

    handleBlurPassword = () => {
        const lowerCaseRegex = new RegExp("[a-z]+", "g")
        const upperCaseRegex = new RegExp("[A-Z]+", "g")
        const numberRegex = new RegExp("[0-9]+", "g")
        const specialCharRegex = new RegExp("[@$!%*?&]+", "g")

        if (this.state.password.length < 8) {
            this.setState({ passwordErrorIsHidden: false, passwordErrorMsg: `Password must be at least 8 characters long.` })
        } else if (this.state.password.length > 20) {
            this.setState({ passwordErrorIsHidden: false, passwordErrorMsg: `Password must be maximum 20 characters long.` })
        } else if (!specialCharRegex.test(this.state.password)) {
            this.setState({ passwordErrorIsHidden: false, passwordErrorMsg: `Password must contain one of these (@, $, !, %, *, ?, &).` })
        } else if (!numberRegex.test(this.state.password)) {
            this.setState({ passwordErrorIsHidden: false, passwordErrorMsg: `Password must contain at least one digit.` })
        } else if (!upperCaseRegex.test(this.state.password)) {
            this.setState({ passwordErrorIsHidden: false, passwordErrorMsg: `Password must contain at least one upper case letter.` })
        } else if (!lowerCaseRegex.test(this.state.password)) {
            this.setState({ passwordErrorIsHidden: false, passwordErrorMsg: `Password must contain at least one lower case letter.` })
        } else {
            this.setState({ passwordErrorIsHidden: true })
        }
    }

    handleChange = (e, type) => {
        const usernameRegex = new RegExp("^[a-zA-Z\\d]+$", "g")
        const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$", "g")

        this.setState({ [`${type}`]: e.target.value })
        if(type == "username" && usernameRegex.test(e.target.value)){
            this.setState({usernameErrorIsHidden: true})
        }else if(type == "password" && passwordRegex.test(e.target.value)){
            this.setState({passwordErrorIsHidden: true})
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
                            onBlur={this.handleBlurUsername}
                            onChange={(e) => this.handleChange(e, 'username')} />
                        <p className={styles.error} hidden={this.state.usernameErrorIsHidden}> {this.state.usernameErrorMsg} </p>

                        <Input name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onBlur={this.handleBlurPassword}
                            onChange={(e) => this.handleChange(e, 'password')} />
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