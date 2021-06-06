import React from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import CustomHeader from '../../components/CustomHeader'
import history from '../../history'

function Report() {

    return (
        <Container>
            <CustomHeader btnBack={() => history.push('/list-users')} >
                <Card.Body>
                    <Card.Title className="text-center">Relatório</Card.Title>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Label>Data inicial de inclusão</Form.Label>
                                <Form.Control placeholder="Data inicial" type="date" />
                            </Col>
                            <Col>
                                <Form.Label>Data final de inclusão</Form.Label>
                                <Form.Control placeholder="Data final" type="date" />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <Form.Label>Data inicial de alteração</Form.Label>
                                <Form.Control placeholder="Data inicial" type="date" />
                            </Col>
                            <Col>
                                <Form.Label>Data final de alteração</Form.Label>
                                <Form.Control placeholder="Data final" type="date" />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col className="text-right">
                                <Button variant="info">Buscar</Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </CustomHeader>
        </Container>
    )
}

export default Report