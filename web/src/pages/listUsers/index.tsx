import React, { FormEvent, useEffect, useMemo, useState } from 'react'
import { Badge, Button, Col, Container, Form, Pagination, Table } from 'react-bootstrap'
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
        getData(page)
    }, [page])

    useMemo(() => {
        genetedPagination(totalUsers, page)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalUsers, page])

    async function getData(page: number, event?: FormEvent) {
        event?.preventDefault()
        try {
            const response = await api.get(`/user/${page}?name=${name}&cpf=${cpf}&login=${login}&disabled=${disabled}`)
            setUsers(response.data)
            setTotalUsers(response.headers["x-total-count"])
        } catch (error) {
            window.alert(error.response.data.message)
        }
    }

    function genetedPagination(totalUsers: number, page: number) {
        const qtdPagination = Math.ceil((totalUsers / 10))
        let items: any = [];
        for (let i = 1; i <= qtdPagination; i++) {
            items.push(
                <Pagination.Item key={i} active={i === page}
                    onClick={() => { getData(i); setPage(i) }}
                >
                    {i}
                </Pagination.Item>,
            );
        }
        setPagination(items)
    }

    return (
        <Container>
            <br />
            <Form style={{ borderColor: "#000" }} onSubmit={(e) => getData(page, e)}>
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
                    <Form.Group>
                        <Form.Check
                            type="checkbox"
                            label="Dasativado"
                            checked={disabled}
                            onChange={() => { setDisabled(!disabled) }}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group>
                        <Button type="submit" variant="primary" size="sm">Pequisar</Button>
                    </Form.Group>
                </Form.Row>
            </Form>
            <h5>Total de usuários:  <Badge variant="secondary">{totalUsers}</Badge></h5>
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
                    {users?.map((user) => {
                        return (
                            <tr id={user.id} key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.cpf}</td>
                                <td>{user.login}</td>
                                <th>{
                                    user.disabled ? <Badge variant="danger">Desativado</Badge> : <Badge variant="success">Ativo</Badge>
                                }
                                </th>
                                <td>{new Date(user.birthDate).toLocaleDateString()}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw',
            }}>
                <Pagination >
                    {pagination}
                </Pagination>
            </div>
        </Container>
    )
}

export default ListUsers