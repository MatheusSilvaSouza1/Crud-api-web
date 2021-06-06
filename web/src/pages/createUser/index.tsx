import React, { FormEvent, useState } from 'react'
import { Button, Col, Container, Form } from 'react-bootstrap'
import moment from 'moment';
import history from '../../history'
import api from '../../services/api'

function CreateUser() {

    const [name, setName] = useState<string>('')
    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [cpf, setCpf] = useState<string>('')
    const [birthDate, setBirthDate] = useState<string>('')
    const [nameMother, setNameMother] = useState<string>('')

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()
        try {
            const response = await api.post('user', {
                name,
                login,
                password,
                email,
                phone,
                cpf,
                birthDate,
                nameMother,
            })
            window.alert(response.data)
            history.push('list-users')
        } catch (error) {
            console.log(error.response.data.message);
            window.alert(error.response.data.message)
        }
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter email"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Login</Form.Label>
                            <Form.Control
                                type="login"
                                placeholder="Enter email"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Telefone(s)</Form.Label>
                    <Form.Control
                        type="tel"
                        placeholder="Enter Telefone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </Form.Group>
                <Form.Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Cpf</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Cpf"
                                maxLength={11}
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Data de nascimento</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Enter email"
                                max={moment.utc().format('YYYY-MM-DD').toString()}
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                </Form.Row>
                <Form.Group>
                    <Form.Label>Nome da mãe</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter email"
                        value={nameMother}
                        onChange={(e) => setNameMother(e.target.value)}
                    />
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit"
                >
                    Cadastrar
                </Button>
            </Form>
        </Container>
    )
}

export default CreateUser