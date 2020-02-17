import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import { isAuthenticated } from './auth'
import Join from './../components/join/Join'
import Main from './../pages/Main'


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={ props => 
        isAuthenticated(props.location.state) ? (
            <Component { ...props } />
        ) : (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
    }/>
)

const Routes = () => {
    return(
        <Switch>
            <Route path='/' exact component={ Join } />
            <PrivateRoute path='/Main' component={ Main }/>
        </Switch>
    )
}
export default Routes