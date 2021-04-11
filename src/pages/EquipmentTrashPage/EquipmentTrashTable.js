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
  RotateLeftOutlined
} from '@ant-design/icons';

import {
  restoreEquipment,
  forceDeleteEquipment,
} from '../../resolvers/trash.resolver'

import { LAPTOP } from '../../helpers/constants'

const EquipmentTrashTable = ({ equipments }) => {
  const [ellipsis,] = useState(true)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [, setVisibleDelEquipConfirm] = useState(false)

  const { Text, Paragraph, Link } = Typography

  const handleRestore = (id) => {
    const handleRes = async () => {
      await restoreEquipment(id)
    }
    handleRes()
  }

  const handleRemove = (id) => {
    const handleRes = async () => {
      await forceDeleteEquipment(id)
    }
    handleRes()
  }

  const handleConfirmDelEquip = (id) => {
    setVisibleDelEquipConfirm(false)
    handleRemove(id)
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
            !status
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
      title: 'Deleted At',
      dataIndex: 'deletedAt',
      width: 100,
      align: 'center',
      key: 'deletedAt',
      render: deletedAt => (
        <>
          {
            !deletedAt
              ? <Text key={deletedAt}></Text>
              : <Text key={deletedAt}>{deletedAt}</Text>
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
            icon={<RotateLeftOutlined key='iconReturn' style={{ fontSize: 15, color: '#57dc16' }} />}
            onClick={() => handleRestore(record.id)}
          />
          <Popconfirm
            placement="bottomRight"
            title='Are you sure to delete this task? This action will not be able to restore data.'
            okText="Yes"
            cancelText="No"
            onConfirm={() => handleConfirmDelEquip(record.id)}
            onCancel={handleCancelDelEquip}
          >
            <Button
              key='deleteEquipment'
              type="text"
              icon={<DeleteOutlined key='iconDelete' style={{ fontSize: 15, color: '#ff4d4f' }} />}
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
        pagination={equipments.length > 0 && {
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
    </>
  )
}

export default EquipmentTrashTable
