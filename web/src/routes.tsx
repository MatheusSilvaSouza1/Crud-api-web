import React from 'react'
import { Route, Switch } from 'react-router-dom'
import CustomRouter from './CustomRouter'
import CreateUser from './pages/createUser'
import ListUsers from './pages/listUsers'
import Login from './pages/Login'
import RecoverPassword from './pages/recoverPassword'
import Report from './pages/report'
import UpdateUser from './pages/updateUser'

function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/recover-password" exact component={RecoverPassword} />
            
            <CustomRouter path="/list-users" exact component={ListUsers} />
            <CustomRouter path="/create-user" exact component={CreateUser} />
            <CustomRouter path="/update-user/:id" exact component={UpdateUser} />

            <CustomRouter path="/report" exact component={Report} />
        </Switch>
    )
}

export default Routes