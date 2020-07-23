import React from 'react';
import LinkComponent from '../links';
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
                    <LinkComponent type="link" text="Donations" href="#" />
                    <LinkComponent type="link" text="Campaigns" href="#" />
                    <LinkComponent type="link" text="Product Development" href="#" />
                    <LinkComponent type="link" text="Startups" href="#" />
                </div>
                <div>
                    <h3>About</h3>
                    <LinkComponent type="link" text="Who are we" href="#" />
                    <LinkComponent type="link" text="Our badge system" href="#" />
                    <LinkComponent type="link" text="How to get started" href="#" />
                </div>
                <div>
                    <h3>Contacts</h3>
                    <p>Dobrich, Bulgaria</p>
                    <p>g.dimitroff28@gmail.com</p>
                    <p>+359 87 877 4129</p>
                </div>
            </div>
            <div className={styles.bottom} id="bottom">
                <p>© 2020 FundFast. All rights reserved.</p>
                <LinkComponent href="https://www.instagram.com/" text={<img id="instagram" src="https://image.flaticon.com/icons/svg/174/174855.svg" alt="Instagram"/>} />
                <LinkComponent href="https://www.twitter.com/" text={<img id="instagram" src="https://image.flaticon.com/icons/svg/733/733579.svg" alt="Twitter"/>} />
                <LinkComponent href="https://www.facebook.com/" text={<img id="instagram" src="https://image.flaticon.com/icons/svg/1312/1312139.svg" alt="Facebook"/>} />
            </div>
        </footer>
    )
}

export default Footer;