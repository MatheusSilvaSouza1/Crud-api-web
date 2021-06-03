import React, { useContext } from 'react'
import { Context } from './contexts/AuthContext'
import { Redirect, Route } from 'react-router-dom'

const CustomRouter = ({ isPrivate = false, ...rest }) => {
    const { loading, authenticated } = useContext(Context)
    if (loading) {
        return <h1>Carregando...</h1>
    }
    if (isPrivate && !authenticated) {
        return <Redirect to="/" />
    }

    return <Route {...rest} />
}

export default CustomRouter