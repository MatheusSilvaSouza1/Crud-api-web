import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Login from './pages/Login'

function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Login} />
            {/* <CustomRouter path={LISTAREMPRESAS} exact component={ListarEmpresas} /> */}
        </Switch>
    )
}

export default Routes