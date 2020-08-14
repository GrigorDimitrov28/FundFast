import React, { useContext } from 'react'
import UserContext from './Context'
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom'
import Navbar from './components/navigation'
import Footer from './components/footer'

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
const LazyDetailsPage = React.lazy(() => import('./pages/fundraiser-details'))
const LazyNotFoundPage = React.lazy(() => import('./pages/404'))
const LazyAccountFundraisersPage = React.lazy(() => import('./pages/user-fundraisers'))
const LazyEditFundraiserPage = React.lazy(() => import('./pages/edit-fundraiser'))
const LazyNavigation = () => {

    const context = useContext(UserContext)

    return (
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Route path="/" exact component={context.loggedIn ? LazyUserHomePage : LazyHomePage} />
                <Route path="/register" exact component={context.loggedIn ? LazyUnauthAccessPage : LazyRegisterPage} />
                <Route path="/login" exact component={context.loggedIn ? LazyUnauthAccessPage : LazyLoginPage} />
                <Route path="/about" exact component={LazyAboutPage} />
                <Route path="/create-fundraiser" exact component={LazyCreateFundraiserPage} />
                <Route path="/500" exact component={LazyServerErrorPage} />
                <Route path="/404" exact component={LazyNotFoundPage} />
                <Route path="/401" exact component={LazyUnauthAccessPage} />
                <Route path="/account-settings" exact component={!context.loggedIn ? LazyUnauthAccessPage : LazyProfileSettingsPage} />
                <Route path="/account-info" exact component={!context.loggedIn ? LazyUnauthAccessPage : LazyProfilePage} />
                <Route path="/account-fundraisers" exact component={context.loggedIn ? LazyAccountFundraisersPage : LazyUnauthAccessPage} />
                <Route path="/fundraiser/" component={LazyDetailsPage} />
                <Route path="/edit/" component={LazyEditFundraiserPage} />
                <Route path="" component={LazyNotFoundPage} />

            </Switch>
            <Footer />
        </BrowserRouter>
    )
}

export default LazyNavigation