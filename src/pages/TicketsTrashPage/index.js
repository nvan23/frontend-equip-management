import React, { useState, useEffect } from 'react'

import {
  Space,
  Row,
  Col,
  Button,
} from 'antd'

import {
  ArrowLeftOutlined
} from '@ant-design/icons';

import TicketTrashTable from './TicketTrashTable'

import { getAllDeletedTickets } from '../../resolvers/ticket.resolver'

const TicketTrashPage = () => {

  const [tickets, setTickets] = useState([])

  useEffect(() => {
    if (tickets.length === 0) {
      getAllDeletedTickets().then(res => setTickets(res));
    }
  }, [tickets])

  return (
    <Space direction="vertical">
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}
      >
        <Button
          type='link'
          href='/tickets'
          icon={<ArrowLeftOutlined style={{ fontSize: 12, color: '#1890ff', marginRight: '10px !important' }} />}>
          Back to Ticket Management
        </Button>
      </div>
      <Row>
        <Col xs={12} sm={12} md={24} lg={24} xl={24}>
          <TicketTrashTable tickets={tickets} loading={!tickets ? true : false} />
        </Col>
      </Row>
    </Space>
  )
}

export default TicketTrashPage