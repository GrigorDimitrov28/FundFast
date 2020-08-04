import React from 'react'
import Navbar from '../../components/navigation'
import Footer from '../../components/footer'
import { useHistory } from 'react-router-dom'
import './500.css'

const Content = () => {
    const history = useHistory()

    const handleClick = () => {
        history.goBack()
    }

    return (
        <div >
            <div id="container-500">
                <img id="left-500" src="./error.png" alt="error" />
                <h1 id="h1-500">500</h1>
                <img id="right-500" src="./error.png" alt="error" />
            </div>
            <h2 id="h2-500">Internal server error <b>:(</b></h2>
            <button id="button-500" onClick={handleClick}>Try again.</button>
        </div>
    )
}

const LazyServerErrorPage = () => {
    return (
        <div>
            <Navbar />
            <Content />
            <Footer type={"sticky"}/>
        </div>
    )
}

export default LazyServerErrorPage