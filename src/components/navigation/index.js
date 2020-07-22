import React from 'react';
import LinkComponent from '../links';
import styles from './index.module.css';
const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <div className={styles.leftLink}>
                <LinkComponent text="FundFast" type="link-left" href="/" />
            </div>

            <div className={styles.rightLinks}>
                <LinkComponent text="Explore" type="link" href="#" />
                <LinkComponent text="About" type="link" href="#" />
                <LinkComponent text="Sign In" type="link" href="/login" />
            </div>
        </nav>
    )
}

export default Navbar;