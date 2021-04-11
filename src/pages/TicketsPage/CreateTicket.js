import React, { useState } from 'react'

import {
  Button,
} from 'antd';

import {
  PlusOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import CreateTicketForm from './CreateTicketForm'

import { createTicket } from '../../resolvers/ticket.resolver'
import { getAllUsersWithNameAndId } from '../../resolvers/user.resolver'
import { getAllEquipmentsWithNameAndId } from '../../resolvers/equipment.resolver'

const CreateTicket = () => {
  const [visible, setVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const onCreate = ({ userId, equipmentId }) => {
    createTicket(userId, equipmentId);
    setVisible(false);
    window.location.reload();
  };

  const handleCreateTicket = () => {
    setVisible(true)

    Promise
      .all([
        getAllUsersWithNameAndId().then(res => res),
        getAllEquipmentsWithNameAndId().then(res => res)
      ])
      .then(result => setDataSource(result))
      .catch(error => console.log(`Error in promises ${error}`))
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Button
          type='primary'
          icon={<PlusOutlined style={{ fontSize: 12, marginRight: '10px !important' }} />}
          onClick={() => handleCreateTicket()}>
          Ticket
        </Button>
        <Button
          type='link'
          href='/trash/tickets'
          icon={<DeleteOutlined style={{ fontSize: 12, color: '#1890ff', marginRight: '10px !important' }} />}>
          Go to Trash
        </Button>
      </div>


      {<CreateTicketForm
        dataSource={dataSource}
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false)
        }}
      />}
    </>
  )
}

export default CreateTicket