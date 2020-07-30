import React, { Component } from 'react'

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

    static contextType = UserContext
    handleSubmit = async (e) => {
        e.preventDefault();
        const {
            username,
            password
        } = this.state

        await authenticate('http://localhost:9999/api/user/register', {
            username,
            password
        }, (user) => {
            this.context.logIn(user)
            this.props.history.push('/')
        }, (err) => {
            console.log('Error', err)
        })
    }
    render() {
        return (
            <div className={styles.wrapper}>
                <div className={styles.loginWrapper}>
                    <h2 className={styles.login}>Sign up</h2>
                    <form className={styles.loginForm} onSubmit={this.handleSubmit}>
                        <Input name="username"
                            placeholder="Username"
                            value={this.state.username}
                            onBlur={() => this.setState(handleBlurUsername(this.state.username))}
                            onChange={(e) => this.setState(handleChange(e, 'username', this.state.password))} />
                        <p className={styles.error} hidden={this.state.usernameErrorIsHidden}> {this.state.usernameErrorMsg} </p>

                        <Input name="password"
                            placeholder="Password"
                            value={this.state.password}
                            onBlur={() => this.setState(handleBlurPassword(this.state.password))}
                            onChange={(e) => this.setState(handleChange(e, 'password', this.state.password))} />
                        <p className={styles.error} hidden={this.state.passwordErrorIsHidden}> {this.state.passwordErrorMsg} </p>

                        <Input name="rePassword"
                            placeholder="Repeat password"
                            value={this.state.rePassword}
                            onBlur={() => this.setState(handleBlurRePassword(this.state.rePassword, this.state.password))}
                            onChange={(e) => this.setState(handleChange(e, 'rePassword', this.state.password))} />
                        <p className={styles.error} hidden={this.state.rePasswordErrorIsHidden}> {this.state.rePasswordErrorMsg} </p>

                        <button type="submit"
                            disabled={this.state.usernameErrorIsHidden === false
                                || this.state.passwordErrorIsHidden === false
                                || this.state.rePasswordErrorIsHidden === false
                                || !this.state.username
                                || !this.state.password
                                || !this.state.rePassword}
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

const LazyRegisterPage = (props) => {
    return (
        <div className="container">
            <Navbar />
            <RegisterForm {...props}/>
            <Footer />
        </div>
    )
}

export default LazyRegisterPage;