import React, { Suspense, useContext } from 'react'
import UserContext from './Context'
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom'

const LazyHomePage = React.lazy(() => import('./pages/home'))
const LazyRegisterPage = React.lazy(() => import('./pages/register'))
const LazyLoginPage = React.lazy(() => import('./pages/login'))
const LazyAboutPage = React.lazy(() => import('./pages/about'))
const LazyServerErrorPage = React.lazy(() => import('./pages/500'))
const LazyUserHomePage = React.lazy(() => import('./pages/home-user'))
const LazyCreateFundraiserPage = React.lazy(() => import('./pages/create-fundraiser'))

const LazyNavigation = () => {
    const context = useContext(UserContext)

    return (
        <BrowserRouter>
            <Switch>
                <Suspense fallback={<h1>Loading..</h1>}>
                    <Route path="/" exact component={context.loggedIn ? LazyUserHomePage : LazyHomePage} />
                    <Route path="/register" component={context.loggedIn ? LazyServerErrorPage : LazyRegisterPage} />
                    <Route path="/login" component={context.loggedIn ? LazyServerErrorPage : LazyLoginPage} />
                    <Route path="/about" component={LazyAboutPage} />
                    <Route path="/create-fundraiser" component={LazyCreateFundraiserPage} />
                    <Route path="/500" component={LazyServerErrorPage} />
                </Suspense>
            </Switch>
        </BrowserRouter>
    )
}

export default LazyNavigation