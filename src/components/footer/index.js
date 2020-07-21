import React from 'react';
import Link from '../links';
import styles from './index.module.css';
const Footer = () => {
    return (
        <footer>
            <div className={styles.links} id="links">
                <div className={styles.moto} id="moto">
                    <h3>FundFast</h3>
                    <p>
                        We help ideas turn into a reality.
                    </p>
                </div>
                <div>
                    <h3>Explore</h3>
                    <Link type="link" text="Donations" href="#" />
                    <Link type="link" text="Campaigns" href="#" />
                    <Link type="link" text="Product Development" href="#" />
                    <Link type="link" text="Startups" href="#" />
                </div>
                <div>
                    <h3>About</h3>
                    <Link type="link" text="Who are we" href="#" />
                    <Link type="link" text="Our badge system" href="#" />
                    <Link type="link" text="How to get started" href="#" />
                </div>
                <div>
                    <h3>Contacts</h3>
                    <p>Dobrich, Bulgaria</p>
                    <p>g.dimitroff28@gmail.com</p>
                    <p>+359 87 877 4129</p>
                </div>
            </div>
            <div className={styles.bottom} id="bottom">
                © 2020 FundFast. All rights reserved.
                <Link href="https://www.instagram.com/" text={<img id="instagram" src="https://image.flaticon.com/icons/svg/174/174855.svg" alt="Instagram"/>} />
                <Link href="https://www.twitter.com/" text={<img id="instagram" src="https://image.flaticon.com/icons/svg/733/733579.svg" alt="Twitter"/>} />
                <Link href="https://www.facebook.com/" text={<img id="instagram" src="https://image.flaticon.com/icons/svg/1312/1312139.svg" alt="Facebook"/>} />
            </div>
        </footer>
    )
}

export default Footer;