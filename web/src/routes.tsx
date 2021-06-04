import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from './pages/Login'
import RecoverPassword from './pages/recoverPassword'

function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/recover-password" exact component={RecoverPassword} />
            {/* <CustomRouter path={LISTAREMPRESAS} exact component={ListarEmpresas} /> */}
        </Switch>
    )
}

export default Routes