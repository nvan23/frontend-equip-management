import React, { useState } from 'react'

import {
  Table,
  Tag,
  Space,
  Typography,
  Button,
  Popconfirm,
} from 'antd'

import {
  LaptopOutlined,
  DesktopOutlined,
  DeleteOutlined,
  RollbackOutlined,
  EditOutlined,
  SyncOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';

import EditEquipment from './EditTicket'

import {
  deleteTicket,
} from '../../resolvers/ticket.resolver'

import { LAPTOP } from '../../helpers/constants'

const EquipmentTable = ({ tickets }) => {
  const [ellipsis,] = useState(true)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [editVisible, setEditVisible] = useState(false)
  const [ticket, setTicket] = useState(null)
  const [, setVisibleDelEquipConfirm] = useState(false)

  const { Text, Paragraph, Link } = Typography

  const onCancelEditVisible = () => {
    setEditVisible(false)
    // setEquipment(null)
  }

  const handleEdit = (id) => {
    setEditVisible(!editVisible)

    const handleRes = async () => {
      // const data = await getEquipment(id)
      // if (!equipment) {
      // setEquipment(data)
      // }
    }

    handleRes()
  }

  const handleDelete = (id) => {
    deleteTicket(id)
  }

  const handleConfirmDelTicket = (id) => {
    setVisibleDelEquipConfirm(false)
    handleDelete(id)
  }

  const handleCancelDelTicket = () => {
    setVisibleDelEquipConfirm(false)
  }

  // define column
  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      width: 150,
      render: username => < Link key={username} > {username}</ Link>,
    },
    // {
    //   title: 'Role',
    //   dataIndex: 'role',
    //   key: 'role',
    //   width: 50,
    //   render: role => <Text key={role} >{role}</Text>,
    // },
    {
      title: 'Equipment',
      dataIndex: 'equipmentName',
      key: 'equipmentName',
      width: 200,
      render: equipmentName => <Link key={equipmentName} >{equipmentName}</Link>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 50,
      render: type => (
        type === LAPTOP
          ? <Tag key={type} icon={<LaptopOutlined />} color='geekblue'> Laptop </Tag>
          : <Tag key={type} icon={<DesktopOutlined />} color='purple'> PC </Tag>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: status => (
        <>
          {
            status
              ? <Tag key={status} color="processing" icon={<SyncOutlined spin />}>Assigning</Tag>
              : <Tag key={status} color="default" icon={<MinusCircleOutlined />}>Close</Tag>
          }
        </>
      )
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 400,
      render: description => (
        <>
          {
            !description
              ? <Text key={description}> No description.</Text>
              : <Paragraph key={description} ellipsis={ellipsis ? { rows: 1, expandable: true, symbol: 'more' } : false}>
                {description}
              </Paragraph>
          }
        </>
      )
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      width: 100,
      align: 'center',
      key: 'createdAt',
      render: createdAt => (
        <>
          {
            !createdAt
              ? <Text key={createdAt}></Text>
              : <Text key={createdAt}>{createdAt}</Text>
          }
        </>
      )
    },
    {
      title: 'Closed At',
      dataIndex: 'closedAt',
      width: 100,
      align: 'center',
      key: 'closedAt',
      render: closedAt => (
        <>
          {
            !closedAt
              ? <Text key={closedAt}></Text>
              : <Text key={closedAt}>{closedAt}</Text>
          }
        </>
      )
    },
    {
      title: 'Action',
      key: 'action',
      width: 150,
      align: 'center',
      fixed: 'right',
      render: (text, record) => (
        <Space key='space'>
          <Button
            key='closeTicket'
            type="text"
            icon={<RollbackOutlined key='iconReturn' style={{ fontSize: 15, color: 'GrayText' }} />}
          // onClick={() => handleRemove(index)}
          />
          <Button
            key='editTicket'
            type="text"
            icon={<EditOutlined key='iconEdit' style={{ fontSize: 15, color: 'GrayText' }} />}
            onClick={() => handleEdit(record.id)}
          />
          <Popconfirm
            placement="bottomRight"
            title='Are you sure to delete this ticket?'
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleConfirmDelTicket(record.id)}
            onCancel={handleCancelDelTicket}
          >
            <Button
              key='deleteTicket'
              type="text"
              icon={<DeleteOutlined key='iconDelete' style={{ fontSize: 15, color: 'GrayText' }} />}
            />
          </Popconfirm>

        </Space >
      ),
    },
  ];

  return (
    <>
      {
        tickets && <Table
          columns={columns}
          dataSource={tickets}
          pagination={tickets.length > 0 && {
            total: tickets.length,
            showQuickJumper: true,
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            defaultPageSize: 5,
            defaultCurrent: 1,
            pageSizeOptions: [5, 10, 20, 50, 100],
          }
          }
        />
      }
      {editVisible && <EditEquipment
        visible={editVisible}
        onCancelEditVisible={onCancelEditVisible}
        ticket={ticket}
      />}
    </>
  )
}

export default EquipmentTable
