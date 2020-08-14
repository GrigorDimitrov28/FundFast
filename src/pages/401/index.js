import React from 'react'
import { useHistory } from 'react-router-dom'
import './401.css'

const Content = () => {
    const history = useHistory()

    const handleClick = () => {
        history.goBack()
    }

    return (
        <div id="content-401">
            <div id="container-401">
                <img id="left-401" src="./error.png" alt="error" />
                <h1 id="h1-401">401</h1>
                <img id="right-401" src="./error.png" alt="error" />
            </div>
            <h2 id="h2-401">Unauthorized access <b>:(</b></h2>
            <button id="button-401" onClick={handleClick}>Go back.</button>
        </div>
    )
}

const LazyServerErrorPage = () => {
    return (
            <Content />
    )
}

export default LazyServerErrorPage