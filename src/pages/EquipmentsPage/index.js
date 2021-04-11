import React, { useState, useEffect } from 'react'

import {
  Space,
  Row,
  Col,
} from 'antd'

import EquipmentTable from './EquipmentTable'
import CreateEquipment from './CreateEquipment'

import { getAllEquipments } from '../../resolvers/equipment.resolver'

const EquipmentPage = () => {

  const [equipments, setEquipments] = useState([])

  useEffect(() => {
    const handleRes = async () => {
      const data = await getAllEquipments()
      setEquipments(data)
    }

    handleRes()

  }, [equipments])

  return (
    <Space direction="vertical">
      <CreateEquipment />
      <Row>
        <Col xs={12} sm={12} md={24} lg={24} xl={24}>
          <EquipmentTable equipments={equipments} />
        </Col>
      </Row>
    </Space>
  )
}

export default EquipmentPage