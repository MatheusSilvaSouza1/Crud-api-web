import React, { createContext, FormEvent, useEffect, useState } from 'react'
import history from '../history'
import api from '../services/api'
import Cookies from 'universal-cookie'
// import SweetAlert from 'react-bootstrap-sweetalert'
// import IAlert from '../models/IAlert'


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
    // const [alert, setAlert] = useState<IAlert>({ type: undefined, titulo: '', show: false })

    useEffect(() => {
        verificarCredenciais()
    })

    async function verificarCredenciais() {
        const token = cookies.get('app-token')

        if (token) {
            api.defaults.headers.Authorization = `Bearer ${token}`
            setAuthenticated(true)
            history.push('/empresas')
        } else {
            history.push('/')
        }
        setLoading(false)
    }

    async function handleLogin(event: FormEvent, email: string, password: string) {
        event.preventDefault()
        try {
            const response = await api.post('login', {
                email,
                password
            })

            if (response.data.token) {
                var date = new Date()
                date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 345))
                cookies.set('app-token', response.data.token, { path: '/', expires: date, maxAge: 28800 })
                api.defaults.headers.Authorization = `Bearer ${cookies.get('app-token')}`
                setAuthenticated(true)
                history.push('/empresas')
            }
        } catch (error) {
            window.alert(error.response.data.message)
        }
    }

    return (
        <Context.Provider value={{ loading, authenticated, handleLogin }}>
            {/* <SweetAlert
                title={alert.titulo}
                show={alert.show}
                type={alert.type}
                onConfirm={() => setAlert({ type: 'default', titulo: '', show: false })}
                btnSize="sm"
            >
                {alert.mensagem && alert.mensagem}
            </SweetAlert> */}
            {children}
        </Context.Provider>
    )
}

export { Context, AuthProvider }