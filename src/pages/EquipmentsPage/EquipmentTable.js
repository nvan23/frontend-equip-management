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
} from '@ant-design/icons';

import EditEquipment from './EditEquipment'

import {
  getEquipment,
  deleteEquipment,
} from '../../resolvers/equipment.resolver'

import { LAPTOP } from '../../helpers/constants'

const EquipmentTable = ({ equipments }) => {
  const [ellipsis,] = useState(true)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [editVisible, setEditVisible] = useState(false)
  const [equipment, setEquipment] = useState(null)
  const [, setVisibleDelEquipConfirm] = useState(false)

  const { Text, Paragraph, Link } = Typography

  const onCancelEditVisible = () => {
    setEditVisible(false)
    setEquipment(null)
  }

  const handleEdit = (id) => {
    setEditVisible(!editVisible)

    const handleRes = async () => {
      const data = await getEquipment(id)
      if (!equipment) {
        setEquipment(data)
      }
    }

    handleRes()
  }

  const handleDelete = (id) => {
    const handleRes = async () => {
      await deleteEquipment(id)
    }
    handleRes()
  }

  const handleConfirmDelEquip = (id) => {
    setVisibleDelEquipConfirm(false)
    handleDelete(id)
  }

  const handleCancelDelEquip = () => {
    setVisibleDelEquipConfirm(false)
  }

  // define column
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: text => <Link key={text} >{text}</Link>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
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
      render: status => (
        <>
          {
            status
              // ? <Tag key={status} color="processing" icon={<SyncOutlined spin />}>Assigning</Tag>
              // : <Tag key={status} color="default" icon={<MinusCircleOutlined />}>Close</Tag>
              ? <Tag key={status} color="cyan">Available</Tag>
              : <Tag key={status} color="red">Unavailable</Tag>
          }
        </>
      )
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: 400,
      key: 'description',
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
      title: 'Action',
      key: 'action',
      width: 150,
      align: 'center',
      fixed: 'right',
      render: (text, record) => (
        <Space key='space'>
          <Button
            key='returnEquipment'
            type="text"
            icon={<RollbackOutlined key='iconReturn' style={{ fontSize: 15, color: 'GrayText' }} />}
          // onClick={() => handleRemove(index)}
          />
          <Button
            key='editEquipment'
            type="text"
            icon={<EditOutlined key='iconEdit' style={{ fontSize: 15, color: 'GrayText' }} />}
            onClick={() => handleEdit(record.id)}
          />
          <Popconfirm
            placement="bottomRight"
            title='Are you sure to delete this equipment?'
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleConfirmDelEquip(record.id)}
            onCancel={handleCancelDelEquip}
          >
            <Button
              key='deleteEquipment'
              type="text"
              icon={<DeleteOutlined key='iconDelete' style={{ fontSize: 15, color: 'GrayText' }} />}
            />
          </Popconfirm>

        </Space >
      ),
    },
  ];

  const onSelectChange = selectedRowKeys => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: changableRowKeys => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return false
            }
            return true
          });
          setSelectedRowKeys(newSelectedRowKeys)
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: changableRowKeys => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return true
            }
            return false
          });
          setSelectedRowKeys(newSelectedRowKeys)
        },
      },
    ],
  };

  return (
    <>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={equipments}
        pagination={equipments && {
          total: equipments.length,
          showQuickJumper: true,
          showSizeChanger: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          defaultPageSize: 5,
          defaultCurrent: 1,
          pageSizeOptions: [5, 10, 20, 50, 100],
        }
        }
      />
      {editVisible && <EditEquipment
        visible={editVisible}
        onCancelEditVisible={onCancelEditVisible}
        equipment={equipment}
      />}
    </>
  )
}

export default EquipmentTable
