import React, { useContext } from 'react'
import LinkComponent from '../links'
import styles from './index.module.css'
import userContext from '../../Context'
import { useHistory } from "react-router-dom"

const Navbar = () => {
    const context = useContext(userContext)
    const history = useHistory()

    const handleClick = () => {
        window.FB.logout(function(response) {
            // Person is now logged out
         });
        context.logOut()
        history.push('/')
    }

    return (
        <nav className={styles.nav}>
            <div className={styles.leftLink}>
                <LinkComponent text="FundFast" type="link-left" href="/" />
            </div>

            <div className={styles.rightLinks}>
                {context.loggedIn && <LinkComponent text="Explore" type="link" href="#" />}
                <LinkComponent text="About" type="link" href="/about" />
                {context.loggedIn && <button className={styles.logout} onClick={handleClick}>Logout</button>}
                {!context.loggedIn && <LinkComponent text="Sign In" type="link" href="/login" />}
            </div>
        </nav>
    )
}

export default Navbar;