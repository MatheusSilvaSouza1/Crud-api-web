import React, { FormEvent, useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form } from 'react-bootstrap'
import { useParams } from 'react-router'
import moment from 'moment';
import history from '../../history'
import api from '../../services/api'
import CustomHeader from '../../components/CustomHeader';


function UpdateUser() {

    const { id }: any = useParams()

    const [name, setName] = useState<string>('')
    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [cpf, setCpf] = useState<string>('')
    const [birthDate, setBirthDate] = useState<string>('')
    const [nameMother, setNameMother] = useState<string>('')
    const [disabled, setDisabled] = useState<boolean>(false)

    useEffect(() => {     
        api.get(`/user/${id}`)
            .then(response => {
                setName(response.data.name)
                setLogin(response.data.login)
                setEmail(response.data.email)
                setPhone(response.data.phone)
                setCpf(response.data.cpf)
                setBirthDate(moment.utc(response.data.birthDate).format("YYYY-MM-DD"))
                setNameMother(response.data.nameMother)
                setDisabled(response.data.disabled)
            }).catch(error => {
                window.alert(error.response.data.message)
            })
    }, [id])

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()

        try {
            const response = await api.put(`user/${id}`, {
                name,
                login,
                password,
                email,
                phone,
                cpf,
                birthDate,
                nameMother,
                disabled
            })
            if (response.status === 200) {
                window.alert('Usuário alterado com sucesso!')
            }
            history.push('/list-users')
        } catch (error) {
            console.log(error.response.data.message);
            window.alert(error.response.data.message)
        }
    }

    return (
        <Container>
            <CustomHeader btnBack={() => history.push('/list-users')} >
                <Card.Body className="text-center">
                    <Card.Title>Editar usuário</Card.Title>
                </Card.Body>
            </CustomHeader>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Nome"
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
                                placeholder="Enter Login"
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
                        value={nameMother}
                        onChange={(e) => setNameMother(e.target.value)}
                    />
                </Form.Group>
                <Form.Group >
                    <Form.Check
                        type="checkbox"
                        label="Desativado"
                        checked={disabled}
                        onChange={() => setDisabled(!disabled)}
                    />
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit"
                >
                    Salvar mudanças
                </Button>
            </Form>
        </Container>
    )
}

export default UpdateUser