import React, { useState, useEffect } from 'react'

import {
  Space,
  Row,
  Col,
  message,
} from 'antd'

import TicketTable from './TicketTable'
import CreateTicket from './CreateTicket'

import { getAllTickets } from '../../resolvers/ticket.resolver'

const TicketPage = () => {

  const [tickets, setTickets] = useState([])

  useEffect(() => {
    getAllTickets().then(res => setTickets(res)).catch(err => message.error(err))
  }, [])

  return (

    <Space direction="vertical">
      <CreateTicket />
      <Row>
        <Col xs={12} sm={12} md={24} lg={24} xl={24}>
          <TicketTable tickets={tickets} />
        </Col>
      </Row>
    </Space>
  )
}

export default TicketPage