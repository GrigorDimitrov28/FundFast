import React, { Suspense, useContext } from 'react'
import UserContext from './Context'
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'

const LazyHomePage = React.lazy(() => import('./pages/home'))
const LazyRegisterPage = React.lazy(() => import('./pages/register'))
const LazyLoginPage = React.lazy(() => import('./pages/login'))
const LazyAboutPage = React.lazy(() => import('./pages/about'))
const LazyServerErrorPage = React.lazy(() => import('./pages/500'))
const LazyUserHomePage = React.lazy(() => import('./pages/home-user'))
const LazyCreateFundraiserPage = React.lazy(() => import('./pages/create-fundraiser'))
const LazyProfilePage = React.lazy(() => import('./pages/profile-page'))
const LazyProfileSettingsPage = React.lazy(() => import('./pages/account-settings'))
const LazyUnauthAccessPage = React.lazy(() => import('./pages/401'))

const LazyNavigation = () => {
    const context = useContext(UserContext)

    return (
        <BrowserRouter>
            <Switch>
                <Suspense fallback={<h1>Loading..</h1>}>
                    <Route path="/" exact component={context.loggedIn ? LazyUserHomePage : LazyHomePage} />
                    <Route path="/register" component={context.loggedIn ? LazyUnauthAccessPage : LazyRegisterPage} />
                    <Route path="/login" exact component={context.loggedIn ? LazyUnauthAccessPage : LazyLoginPage} />
                    <Route path="/about" component={LazyAboutPage} />
                    <Route path="/create-fundraiser" component={LazyCreateFundraiserPage} />
                    <Route path="/500" component={LazyServerErrorPage} />
                    <Route path="/account-settings" component={!context.loggedIn ? LazyUnauthAccessPage : LazyProfileSettingsPage} />
                    <Route path="/account-info" component={!context.loggedIn ? LazyUnauthAccessPage : LazyProfilePage} />
                    <Route path="" component={LazyUnauthAccessPage} />
                </Suspense>
            </Switch>
        </BrowserRouter>
    )
}

export default LazyNavigation