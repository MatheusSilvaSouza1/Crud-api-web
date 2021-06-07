import React, { useContext } from 'react'
import { Context } from './contexts/AuthContext'
import { Redirect, Route } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'

const CustomRouter = ({ isPrivate = false, ...rest }) => {
    const { loading, authenticated } = useContext(Context)
    if (loading) {
        return <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>
    }
    if (isPrivate && !authenticated) {
        return <Redirect to="/" />
    }

    return <Route {...rest} />
}

export default CustomRouter