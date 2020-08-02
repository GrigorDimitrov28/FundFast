import React from 'react'
import Navbar from '../../components/navigation'
import Footer from '../../components/footer'
import styles from './index.module.css'
const LazyServerErrorPage = () => {
    return (
        <div >
            <Navbar />
            <div className={styles.wrapper}>
                <img className={styles.error} src="./500png.png" alt="error 500" />
            </div>

            <Footer />
        </div>
    )
}

export default LazyServerErrorPage