import React from 'react'
import { useHistory } from 'react-router-dom'
import './500.css'

const Content = () => {
    const history = useHistory()

    const handleClick = () => {
        history.goBack()
    }

    return (
        <div id="content-500">
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
        <Content />
    )
}

export default LazyServerErrorPage