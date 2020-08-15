import React, { useContext } from 'react'
import LinkComponent from '../links'
import styles from './index.module.css'
import userContext from '../../Context'
import Dropdown from '../dropdown/index'

const Navbar = () => {
    const context = useContext(userContext)

    return (
        <nav className={styles.nav}>
            <div className={styles.leftLink}>
                <LinkComponent text="FundFast" type="link-left" href="/" />
            </div>

            <div className={styles.rightLinks}>
                {context.loggedIn && <LinkComponent text="Blogs" type="link" href="/blogs" />}
                {context.loggedIn && <Dropdown navItemName="Fundraisers" menuClass="frDropdown"
                links={['Donations', 'Campaigns', 'Product development', 'Startups']}/>}
                <LinkComponent text="About" type="link" href="/about" />
                {context.loggedIn && <Dropdown navItemName="More" menuClass="userDropdown"
                links={['Account', 'Settings', 'Logout']}/>}
                {!context.loggedIn && <LinkComponent text="Sign In" type="link" href="/login" />}
            </div>
        </nav>
    )
}

export default Navbar;