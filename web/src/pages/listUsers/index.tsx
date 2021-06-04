import React, { useEffect, useMemo, useState } from 'react'
import { Badge, Container, Pagination, Table } from 'react-bootstrap'
import { IUser } from '../../interfaces/IUser'
import api from '../../services/api'

function ListUsers() {

    const [page, setPage] = useState(1)
    const [totalUsers, setTotalUsers] = useState(0)
    const [users, setUsers] = useState<IUser[]>()

    const [pagination, setPagination] = useState<any[]>()

    useEffect(() => {
        getData(page)
    }, [page])

    useMemo(() => {
        genetedPagination(totalUsers, page)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalUsers, page])

    async function getData(page: number) {
        try {
            const response = await api.get(`/user/${page}`)
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
            <h5>Total de usuários:  <Badge variant="secondary">{totalUsers}</Badge></h5>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Cpf</th>
                        <th>Nome mãe</th>
                        <th>Email</th>
                        <th>Login</th>
                        <th>Data de nasc.</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user) => {
                        return (
                            <tr id={user.id} key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.cpf}</td>
                                <td>{user.nameMother}</td>
                                <td>{user.email}</td>
                                <td>{user.login}</td>
                                <td>{new Date(user.birthDate).toLocaleDateString()}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Pagination >
                    {pagination}
                </Pagination>
            </div>
        </Container>
    )
}

export default ListUsers