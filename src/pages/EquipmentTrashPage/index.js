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

import EquipmentTrashTable from './EquipmentTrashTable'

import { getAllDeletedEquipments } from '../../resolvers/trash.resolver'

const EquipmentPage = () => {

  const [equipments, setEquipments] = useState([])

  useEffect(() => {
    const handleRes = async () => {
      const data = await getAllDeletedEquipments();
      if (equipments.length === 0) {
        setEquipments(data)
      }
    }

    handleRes()

  }, [equipments])

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
          href='/equipments'
          icon={<ArrowLeftOutlined style={{ fontSize: 12, color: '#1890ff', marginRight: '10px !important' }} />}>
          Back to Equipment Management
        </Button>
      </div>
      <Row>
        <Col xs={12} sm={12} md={24} lg={24} xl={24}>
          <EquipmentTrashTable equipments={equipments} loading={!equipments ? true : false} />
        </Col>
      </Row>
    </Space>
  )
}

export default EquipmentPage