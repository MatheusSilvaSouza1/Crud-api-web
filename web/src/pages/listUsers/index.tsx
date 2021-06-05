import React, { useEffect, useMemo, useState } from 'react'
import { Badge, Button, Card, Col, Container, Form, Pagination, Table } from 'react-bootstrap'
import history from '../../history'
import { IUser } from '../../interfaces/IUser'
import api from '../../services/api'

function ListUsers() {

    const [page, setPage] = useState(1)
    const [totalUsers, setTotalUsers] = useState(0)
    const [users, setUsers] = useState<IUser[]>()

    const [name, setName] = useState<string>('')
    const [login, setLogin] = useState<string>('')
    const [cpf, setCpf] = useState<string>('')
    const [disabled, setDisabled] = useState<boolean>(false)

    const [pagination, setPagination] = useState<any[]>()

    useEffect(() => {
        async function getData() {
            try {
                const response = await api.get(`/user/${page}?name=${name}&cpf=${cpf}&login=${login}&disabled=${disabled}`)
                setUsers(response.data)
                setTotalUsers(response.headers["x-total-count"])
            } catch (error) {
                window.alert(error.response.data.message)
            }
        }
        getData()
    }, [cpf, disabled, login, name, page])

    useMemo(() => {
        genetedPagination(totalUsers, page)
    }, [totalUsers, page])

    function genetedPagination(totalUsers: number, page: number) {
        const qtdPagination = Math.ceil((totalUsers / 10))
        page > qtdPagination ? setPage(1) : setPage(page)
        let items: any = [];
        for (let i = 1; i <= qtdPagination; i++) {
            items.push(
                <Pagination.Item
                    key={i}
                    active={i === page}
                    onClick={() => { setPage(i) }}
                >
                    {i}
                </Pagination.Item>,
            );
        }
        setPagination(items)
    }

    return (
        <Container>
            <Card border="ligth" >
                <Card.Header className="text-center">Usuários</Card.Header>
                <Card.Body>
                    <Card.Title className="text-center">Pesquisa</Card.Title>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Control
                                    placeholder="Nome"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Control
                                    placeholder="Cpf"
                                    value={cpf}
                                    onChange={(e) => setCpf(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Control
                                    placeholder="Login"
                                    value={login}
                                    onChange={(e) => setLogin(e.target.value)}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group>
                                <Form.Check
                                    type="checkbox"
                                    label="Dasativado"
                                    checked={disabled}
                                    onChange={() => { setDisabled(!disabled) }}
                                />
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </Card.Body>
                <Card.Footer className="text-right">
                    <Button
                        type="button"
                        variant="success"
                        onClick={() => history.push('create-user')}
                    >
                        Novo usuário
                    </Button>
                </Card.Footer>
            </Card>
            <br />

            <h6>Total de usuários:  <Badge variant="secondary">{totalUsers}</Badge></h6>
            <Table striped bordered hover size="sm" responsive>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Cpf</th>
                        <th>Login</th>
                        <th>Situação</th>
                        <th>Data de nasc.</th>
                        <th>Editar</th>
                        <th>Excluir</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user) => {
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
                                <td>{new Date(user.birthDate).toLocaleDateString()}</td>
                                <td><Button variant="warning" size="sm">Warning</Button></td>
                                <td><Button variant="danger" size="sm">Danger</Button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Pagination >
                    {pagination}
                </Pagination>
            </div>
        </Container>
    )
}

export default ListUsers