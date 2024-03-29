import React, { useEffect, useMemo, useState } from 'react'
import { Badge, Button, Card, Col, Container, Form, Pagination, Table } from 'react-bootstrap'
import history from '../../history'
import { IUser } from '../../interfaces/IUser'
import api from '../../services/api'
import { IoMdPersonAdd, IoMdCreate, IoMdTrash, IoMdGrid } from 'react-icons/io'
import moment from 'moment';
import CustomHeader from '../../components/CustomHeader'

function ListUsers() {

    const [page, setPage] = useState(1)
    const [totalUsers, setTotalUsers] = useState(0)
    const [users, setUsers] = useState<IUser[]>([])

    //? Filtros
    const [name, setName] = useState<string>('')
    const [login, setLogin] = useState<string>('')
    const [cpf, setCpf] = useState<string>('')
    const [disabled, setDisabled] = useState<boolean>(false)

    useEffect(() => {
        getData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cpf, disabled, login, name, page])

    async function getData() {
        try {
            const response = await api
                .get(`/user/?page=${page}&name=${name}&cpf=${cpf}&login=${login}&disabled=${disabled}`)
            setUsers(response.data)
            setTotalUsers(response.headers["x-total-count"])
        } catch (error) {
            window.alert(error.response.data.message)
        }
    }

    const [pagination, setPagination] = useState<any[]>()

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

    async function handleDelete() {
        const deleteUsers = users?.filter(user => user.selected)
        const deleteIds: any[] = []
        deleteUsers?.map(user => deleteIds.push(user.id))
        try {
            const response = await api.delete('user', {
                data: {
                    ids: deleteIds
                }
            })
            if (response.status === 200) {
                window.alert('Usuário(s) excluido(s) com sucesso!')
                getData()
            }
        } catch (error) {
            console.log(error.response.data.message);
            window.alert(error.response.data.message)
        }
    }

    return (
        <Container>
            <CustomHeader btnBack={() => history.goBack()}>
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
                <Card.Footer style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                        type="button"
                        variant="info"
                        onClick={() => history.push('/report')}
                    >
                        Relatório <Badge variant="light"><IoMdGrid /></Badge>
                    </Button>
                    <Button
                        type="button"
                        variant="success"
                        onClick={() => history.push('create-user')}
                    >
                        Novo usuário <Badge variant="light"><IoMdPersonAdd /></Badge>
                    </Button>
                </Card.Footer>
            </CustomHeader>
            <br />
            <h6>Total de usuários:  <Badge variant="secondary">{totalUsers}</Badge></h6>
            {users?.length > 0 &&
                <Table striped bordered hover size="sm" responsive>
                    <thead>
                        <tr>
                            <td className="text-center">
                                <Button
                                    variant="danger"
                                    onClick={handleDelete}
                                    size="sm"
                                >
                                    <IoMdTrash size={15} />
                                </Button>
                            </td>
                            <th>Nome</th>
                            <th>Cpf</th>
                            <th>Login</th>
                            <th>Situação</th>
                            <th>Data de nasc.</th>
                            <th>Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user) => {
                            return (
                                <tr id={user.id} key={user.id}>
                                    <td className="text-center">
                                        <Form.Check
                                            type="checkbox"
                                            checked={user.selected}
                                            onChange={() => { user.selected = !user.selected }}
                                        />
                                    </td>
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
                                    <td className="text-center">
                                        <Button
                                            variant="warning"
                                            size="sm"
                                            onClick={() => history.push(`update-user/${user.id}`)}
                                        >
                                            <IoMdCreate size={20} />
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            }

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