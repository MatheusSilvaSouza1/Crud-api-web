import React, { FormEvent, useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import history from '../../history'
import api from '../../services/api'
import './style.css'

function RecoverPassword() {

    const [email, setEmail] = useState<string>('')
    const [cpf, setCpf] = useState<string>('')
    const [nameMother, setNameMother] = useState<string>('')
    const [newPassword, setNewPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    const [passwordsIsValid, setPasswordsIsValid] = useState(false)

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()
        try {
            const response = await api.post('recover-password', {
                email: email,
                cpf: cpf,
                nameMother: nameMother,
                newPassword: newPassword
            })
            if (response.status === 200) {
                window.alert('Senha alterada com sucesso!')
                history.push('/')
            }
        } catch (error) {
            window.alert(error.response.data.message)
        }

    }

    useEffect(() => {
        if (newPassword === confirmPassword &&
            (newPassword !== '' && confirmPassword !== '')) {
            setPasswordsIsValid(true)
        } else {
            setPasswordsIsValid(false)
        }
    }, [newPassword, confirmPassword])

    return (
        <div id="page">
            <Container id="box">
                <Card id="custom-card" >
                    <Form
                        onSubmit={handleSubmit}
                    >
                        <Card.Body>
                            <Form.Group >
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    id="input-login"
                                    type="login"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Informe o email"
                                    required
                                />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Cpf</Form.Label>
                                <Form.Control
                                    id="input-cpf"
                                    type="text"
                                    value={cpf}
                                    onChange={(e) => setCpf(e.target.value)}
                                    placeholder="Informe o cpf"
                                    required
                                />
                            </Form.Group>
                            <Form.Group >
                                <Form.Label>Nome da mãe</Form.Label>
                                <Form.Control
                                    id="input-nameMother"
                                    type="text"
                                    value={nameMother}
                                    onChange={(e) => setNameMother(e.target.value)}
                                    placeholder="Informe o nome da mãe"
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Nova senha</Form.Label>
                                <Form.Control
                                    id="input-password"
                                    type="password"
                                    isValid={passwordsIsValid}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Informe a senha"
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Confirmar a nova senha</Form.Label>
                                <Form.Control
                                    id="input-confirmPassword"
                                    type="password"
                                    isValid={passwordsIsValid}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirmar"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    As senhas não estão iguais.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Card.Body>
                        <Card.Footer >
                            <Row>
                                <Col className="text-left">
                                    <Button id="btn-back"
                                        variant="outline-secondary"
                                        type="button"
                                        onClick={() => history.push('/')}
                                    >
                                        Voltar
                                    </Button>
                                </Col>
                                <Col className="text-right">
                                    <Button id="btn-login" variant="outline-primary" type="submit">Entrar</Button>
                                </Col>
                            </Row>
                        </Card.Footer>
                    </Form>
                </Card>
            </Container>
        </div>
    )
}

export default RecoverPassword