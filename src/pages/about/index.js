import React, { useContext } from 'react'
import styles from './index.module.css'
import Navbar from '../../components/navigation'
import Footer from '../../components/footer'
import { AboutHeaderPhoto } from '../../components/img-under-nav'
import UserContext from '../../Context'

const Content = () => {
    return (
        <div className={styles.content}>
            <h2>What is FundFast?</h2>
            <div className={styles.row}>
                <p>FundFast is a project project website.
                It aims to give people an easy-to-use platform
                where they can gather funds for many different causes.
                The platform is designed to work with different
                currencies and categories of fundraising posts.
                </p>
                <img className={styles.users} src="./users.png" alt="users-registered" />
                <h3 className={styles.dynamic}>0 Users</h3>
            </div>


            <h2>What is FundFast Blog?</h2>
            <div className={styles.row}>
                <p>FundFast Blog is a place for all people who have
                successfully gathered funds for a cause to tell their story.
                You can write about something as small as getting a few bucks
                to buy a guitar or raising millions to launch a revolutionary
                product on the market. The choice is yours.
                </p>
                <img className={styles.funds} src="./funds.png" alt="funds-raised" />
                <h3 className={styles.dynamic}>0$ raised</h3>
            </div>

            <h2>How does FundFast work?</h2>
            <div className={styles.row}>
                <p>It's really easy! Just sign up and deposit some money
                if you want to help people out. If you are seeking help
                just create your fundraising post. Be as descriptive about
                your idea as you can be. You want people to know in detail about
                your initiative so they can help you. Every post lasts for exactly
                30 days or until completed.
                </p>
                <img className={styles.funds} src="./projects.png" alt="projects-completed" />
                <h3 className={styles.dynamic}>0 projects funded</h3>
            </div>


            <h2>Can I get notifications?</h2>
            <div className={styles.row}>
                <p>You sure can! Just enter your profile settings
                and from there you can subscribe to get emails for every
                new post of a certain category or all of them if you want.
                </p>
                <img className={styles.funds} src="./blog.png" alt="blog-posts" />
                <h3 className={styles.dynamic}>0 blog posts</h3>
            </div>


            <h2>Can I still donate if all the money is raised?</h2>
            <div className={styles.row}>
                <p>It depends. Everybody who creates a fundraising initiative
                chooses whether they want the post to disappear after all the money
                is raised or not. If they agree, there is no limit to how much you
                can donate during the time the post is active.
            </p>
                <img className={styles.active} src="./active.png" alt="fundraisers-active" />
                <h3 className={styles.dynamicActive}>0 active fundraisers</h3>
            </div>
        </div>
    )
}


const AboutPage = () => {
    const context = useContext(UserContext);

    return (
        <div>
            <Navbar />
            <AboutHeaderPhoto btnText={context.loggedIn ? 'Add fundraiser' : 'Sign Up'}
            href={context.loggedIn ? '/create-fundraiser' : '/register'}
            pText={context.loggedIn ? 'Add a fundraiser and make your change.' : 'Join us now and make your change.'}/>
            <Content />
            <Footer />
        </div>
    )
}

export default AboutPage