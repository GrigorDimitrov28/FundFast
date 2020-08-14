import React from 'react'
import { useHistory } from 'react-router-dom'
import './404.css'

const Content = () => {
    const history = useHistory()

    const handleClick = () => {
        history.push('/')
    }

    return (
        <div id="content-404">
            <div id="container-404">
                <img id="left-404" src="./error.png" alt="error" />
                <h1 id="h1-404">404</h1>
                <img id="right-404" src="./error.png" alt="error" />
            </div>
            <h2 id="h2-404">Content not found<b>:(</b></h2>
            <button id="button-404" onClick={handleClick}>Try again.</button>
        </div>
    )
}

const LazyServerErrorPage = () => {
    return (
        <Content />
    )
}

export default LazyServerErrorPage