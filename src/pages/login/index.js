import React from 'react';

import Navbar from '../../components/navigation'
import Footer from '../../components/footer'



const LazyLoginPage = () => {
    return (
        <div className="container">
            <Navbar />
            <h1> Login </h1>
            <Footer />
        </div>
    )
}

export default LazyLoginPage;