import React from 'react';
import Link from '../links';
import styles from './index.module.css';

const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <div className={styles.leftLink}>
                <Link text="FundFast" type="link-left" href="#" />
            </div>

            <div className={styles.rightLinks}>
                <Link text="Explore" type="link" href="#" />
                <Link text="About" type="link" href="#" />
                <Link text="Sign In" type="link" href="#" />
            </div>
        </nav>
    )
}

export default Navbar;