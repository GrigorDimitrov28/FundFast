import React from 'react'
import styles from './index.module.css'
import Navbar from '../../components/navigation'
import Footer from '../../components/footer'
import { AboutHeaderPhoto } from '../../components/img-under-nav'
const AboutPage = () => {

    return (
        <div>
            <Navbar />
            <AboutHeaderPhoto />
            <h1>About</h1>
            <Footer />
        </div>
    )
}

export default AboutPage