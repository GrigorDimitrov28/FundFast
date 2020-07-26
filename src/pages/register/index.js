import React, { Component } from 'react'

import styles from './index.module.css'
import Navbar from '../../components/navigation'
import Footer from '../../components/footer'
import Input from '../../components/input'
import { Link } from 'react-router-dom'

class RegisterForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: "",
            rePassword: "",
            usernameErrorMsg: "",
            passwordErrorMsg: "",
            rePasswordErrorMsg: "",
            usernameErrorIsHidden: true,
            passwordErrorIsHidden: true,
            rePasswordErrorIsHidden: true
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

    handleBlurRePassword = () => {
        if (this.state.password !== this.state.rePassword) {
            this.setState({ rePasswordErrorIsHidden: false, rePasswordErrorMsg: "Passwords should match." })
        } else {
            this.setState({ rePasswordErrorIsHidden: true })
        }
    }

    handleChange = (e, type) => {
        const usernameRegex = new RegExp("^[a-zA-Z\\d]+$", "g")
        const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$", "g")

        this.setState({ [`${type}`]: e.target.value })
        if (type == "username" && usernameRegex.test(e.target.value)) {
            this.setState({ usernameErrorIsHidden: true })
        } else if (type == "password" && passwordRegex.test(e.target.value)) {
            this.setState({ passwordErrorIsHidden: true })
        } else if (type == "rePassword" && e.target.value == this.state.password) {
            this.setState({ rePasswordErrorIsHidden: true })
        }
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.loginWrapper}>
                    <h2 className={styles.login}>Sign up</h2>
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

                        <Input name="rePassword"
                            placeholder="Repeat password"
                            value={this.state.rePassword}
                            onBlur={this.handleBlurRePassword}
                            onChange={(e) => this.handleChange(e, 'rePassword')} />
                        <p className={styles.error} hidden={this.state.rePasswordErrorIsHidden}> {this.state.rePasswordErrorMsg} </p>

                        <button type="submit"
                            disabled={this.state.usernameErrorIsHidden == false
                                || this.state.passwordErrorIsHidden == false
                                || this.state.rePasswordErrorIsHidden == false}
                            className={styles.submit}>
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
                        <Link to={'/login'} className={styles.register}>Sign In</Link>
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