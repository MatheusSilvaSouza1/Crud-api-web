import React, { createContext, FormEvent, useEffect, useState } from 'react'
import history from '../history'
import api from '../services/api'
import Cookies from 'universal-cookie'



interface AuthContextData {
    loading: boolean
    authenticated: boolean
    handleLogin(event: FormEvent, login: string, password: string): void
}

const Context = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FC = ({ children }) => {

    const cookies = new Cookies()
    const [authenticated, setAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        verifyAuthentication()
    })

    async function verifyAuthentication() {
        const token = cookies.get('app-token')

        if (token) {
            api.defaults.headers.Authorization = `Bearer ${token}`
            setAuthenticated(true)
            history.push('/list-users')
        } else {
            history.push('/')
        }
        setLoading(false)
    }

    async function handleLogin(event: FormEvent, login: string, password: string) {
        event.preventDefault()
        try {
            const response = await api.post('login', {
                login,
                password
            })

            if (response.data.token) {
                var date = new Date()
                date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 345))
                cookies.set('app-token', response.data.token, { path: '/', expires: date, maxAge: 28800 })
                api.defaults.headers.Authorization = `Bearer ${cookies.get('app-token')}`
                setAuthenticated(true)
                history.push('/list-users')
            }
        } catch (error) {
            window.alert(error.response.data.message)
        }
    }

    return (
        <Context.Provider value={{ loading, authenticated, handleLogin }}>
            {children}
        </Context.Provider>
    )
}

export { Context, AuthProvider }