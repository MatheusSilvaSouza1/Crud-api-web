import React, { FormEvent, useState } from 'react'
import { Badge, Button, Card, Col, Container, Form, Row, Table } from 'react-bootstrap'
import moment from 'moment';
import CustomHeader from '../../components/CustomHeader'
import history from '../../history'
import { IUser } from '../../interfaces/IUser'
import api from '../../services/api'

function Report() {

    //? Filtros
    const [inclusionFirst, setInclusionFirst] = useState('2021-06-01')
    const [inclusionEnd, setInclusionEnd] = useState('2021-06-30')
    const [changedFirst, setChangedFirst] = useState('2021-06-01')
    const [changedEnd, setChangedEnd] = useState('2021-06-30')
    const [minAge, setMinAge] = useState(18)
    const [maxAge, setMaxAge] = useState(26)
    
    const [users, setUsers] = useState<IUser[]>([])

    function handleSelect(ageGroup: any) {
        switch (parseInt(ageGroup.target.value)) {
            case 18:
                setMinAge(18)
                setMaxAge(26)
                break;
            case 25:
                setMinAge(25)
                setMaxAge(31)
                break;
            case 30:
                setMinAge(30)
                setMaxAge(36)
                break;
            case 35:
                setMinAge(35)
                setMaxAge(41)
                break;
            default:
                setMinAge(40)
                setMaxAge(9999)
                break;
        }
    }

    async function handleSubmitFielter(event: FormEvent) {
        event.preventDefault()
        try {
            const response = await api
                .get(`report?inclusionFirst=${inclusionFirst}&inclusionEnd=${inclusionEnd}`
                    + `&changedFirst=${changedFirst}&changedEnd=${changedEnd}`
                    + `&minAge=${minAge}&maxAge=${maxAge}`)

            setUsers(response.data)
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    return (
        <Container>
            <CustomHeader btnBack={() => history.push('/list-users')} >
                <Card.Body>
                    <Card.Title className="text-center">Relatório</Card.Title>
                    <Form onSubmit={handleSubmitFielter}>
                        <Row>
                            <Col>
                                <Form.Label>Data inicial de inclusão</Form.Label>
                                <Form.Control
                                    placeholder="Data inicial"
                                    type="date"
                                    value={inclusionFirst}
                                    onChange={(e) => setInclusionFirst(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <Form.Label>Data final de inclusão</Form.Label>
                                <Form.Control
                                    placeholder="Data final"
                                    type="date"
                                    value={inclusionEnd}
                                    onChange={(e) => setInclusionEnd(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <Form.Label>Data inicial de alteração</Form.Label>
                                <Form.Control
                                    id="first-date"
                                    placeholder="Data inicial"
                                    type="date"
                                    value={changedFirst}
                                    onChange={(e) => setChangedFirst(e.target.value)}
                                />
                            </Col>
                            <Col>
                                <Form.Label>Data final de alteração</Form.Label>
                                <Form.Control
                                    id="end-date"
                                    placeholder="Data final"
                                    type="date"
                                    value={changedEnd}
                                    onChange={(e) => setChangedEnd(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <br />
                        <Row className="justify-content-md-center">
                            <Col md >
                                <Form.Group>
                                    <Form.Label>Faixa etária</Form.Label>
                                    <Form.Control
                                        as="select"
                                        onChange={handleSelect}
                                        custom
                                    >
                                        <option value="18">Maior que 18 e menor que 26</option>
                                        <option value="25">Maior que 25 e menor que 31</option>
                                        <option value="30">Maior que 30 e menor que 36</option>
                                        <option value="35">Maior que 35 e menor que 41</option>
                                        <option value="40">Maior que 40</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col className="text-right">
                                <Button variant="info" type="submit">Buscar</Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </CustomHeader>
            <br />
            {(users?.length > 0) &&
            <Table striped bordered hover size="sm" responsive>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Cpf</th>
                        <th>Login</th>
                        <th>Situação</th>
                        <th>Data de nasc.</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => {
                        return (
                            <tr id={user.id} key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.cpf}</td>
                                <td>{user.login}</td>
                                <th>{
                                    user.disabled ?
                                        <Badge variant="danger">Desativado</Badge> :
                                        <Badge variant="success">Ativo</Badge>
                                }
                                </th>
                                <td>{moment.utc(user.birthDate).format('DD/MM/YYYY')}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>}
        </Container>
    )
}

export default Report