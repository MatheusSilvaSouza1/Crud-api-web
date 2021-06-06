import React from 'react'
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap"
import Cookies from 'universal-cookie'
import history from '../history'
import api from '../services/api'
import { IoMdExit, IoMdArrowRoundBack } from 'react-icons/io'

interface IProps {
    btnBack(): void
}

const CustomHeader: React.FC<IProps> = ({ btnBack, children }) => {

    const cookies = new Cookies()
    function logoff() {
        cookies.set('app-token', '', { path: '/', expires: undefined, maxAge: -1 })
        api.defaults.headers.Authorization = ``
        history.push('/')
    }

    return (
        <Card >
            <Card.Header style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between' }}>

                <OverlayTrigger
                    placement="auto"
                    overlay={
                        <Tooltip id={`tooltip-back`}>
                            Voltar
                        </Tooltip>
                    }
                >
                    <Card.Link onClick={btnBack}>
                        <IoMdArrowRoundBack size={35} />
                    </Card.Link>
                </OverlayTrigger>

                <OverlayTrigger
                    placement="auto"
                    overlay={
                        <Tooltip id={`tooltip-logoff`}>
                            Sair
                        </Tooltip>
                    }
                >
                    <Card.Link onClick={logoff}>
                        <IoMdExit size={35} />
                    </Card.Link>
                </OverlayTrigger>

            </Card.Header>
            {children}

        </Card>
    )
}

export default CustomHeader