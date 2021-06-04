import React, { useState, useContext } from 'react'
import { Card, Button, Container, Form } from 'react-bootstrap'
import { Context } from '../../contexts/AuthContext'
import history from '../../history'
import './style.css'

const Login = () => {
    const { handleLogin } = useContext(Context)

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div id="page">
            <Container id="box">
                <Card id="custom-card" >
                    <Form onSubmit={(e) => {
                        handleLogin(e, login, password)
                    }}>
                        <Card.Header style={{ background: "#f1f3f3" }}>
                            Login
                        </Card.Header>
                        <Card.Body >
                            <Form.Group >
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    id="input-login"
                                    type="login"
                                    value={login}
                                    onChange={(e) => setLogin(e.target.value)}
                                    placeholder="Informe o email"
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Senha</Form.Label>
                                <Form.Control
                                    id="input-password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Informe a senha"
                                    required
                                />
                            </Form.Group>
                            <Button variant="link" size="sm" onClick={() => history.push('recover-password')}>
                                Esqueceu a senha?
                            </Button>
                        </Card.Body>
                        <Card.Footer className="text-right">
                            <Button id="btn-login" variant="outline-primary" type="submit">
                                Entrar
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </Container>
        </div>
    )

}

export default Login