import React from 'react'
import { Route, Switch } from 'react-router-dom'
import CustomRouter from './CustomRouter'
import ListUsers from './pages/listUsers'
import Login from './pages/Login'
import RecoverPassword from './pages/recoverPassword'

function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/recover-password" exact component={RecoverPassword} />
            <CustomRouter path="/list-users" exact component={ListUsers} />
        </Switch>
    )
}

export default Routes