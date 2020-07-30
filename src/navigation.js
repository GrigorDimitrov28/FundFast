import React, { Suspense } from 'react'

import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom'

const LazyHomePage = React.lazy(() => import('./pages/home'))
const LazyRegisterPage = React.lazy(() => import('./pages/register'))
const LazyLoginPage = React.lazy(() => import('./pages/login'))
const LazyAboutPage = React.lazy(() => import('./pages/about'))

const LazyNavigation = () => {

    return (
        <BrowserRouter>
            <Switch>
                <Suspense fallback={<h1>Loading..</h1>}>
                    <Route path="/" exact component={LazyHomePage} />
                    <Route path="/register" component={LazyRegisterPage} />
                    <Route path="/login" component={LazyLoginPage} />
                    <Route path="/about" component={LazyAboutPage} />
                    {/* <Route component={LazyErrorPage} /> */}
                </Suspense>
            </Switch>
        </BrowserRouter>
    )
}

export default LazyNavigation