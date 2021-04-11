import React, { useState, useEffect } from 'react'

import {
  Space,
  Row,
  Col,
} from 'antd'

import TicketTable from './TicketTable'
import CreateTicket from './CreateTicket'

import { getAllTickets } from '../../resolvers/ticket.resolver'

const TicketPage = () => {

  const [tickets, setTickets] = useState([])

  useEffect(() => {
    if (tickets.length === 0) {
      getAllTickets().then(res => setTickets(res))
    }
  }, [tickets])

  return (

    <Space direction="vertical">
      <CreateTicket />
      {/* <TicketForm dataSource={tickets} /> */}

      <Row>
        <Col xs={12} sm={12} md={24} lg={24} xl={24}>
          <TicketTable tickets={tickets} />
        </Col>
      </Row>
    </Space>
  )
}

export default TicketPage