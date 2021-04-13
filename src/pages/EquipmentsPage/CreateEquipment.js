import React, { useState } from 'react'

import {
  Button,
} from 'antd';

import {
  PlusOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import CreateEquipmentForm from './CreateEquipmentForm'

import { createEquipment } from '../../resolvers/equipment.resolver'

const CreateEquipment = () => {
  const [visible, setVisible] = useState(false);
  const onCreate = ({ name, type, description }) => {
    createEquipment(name, type, description);
    setVisible(false);
    window.location.reload();
  };

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
          onClick={() => setVisible(true)}
          icon={<PlusOutlined style={{ fontSize: 12, marginRight: '10px !important' }} />}>
          Equipment
        </Button>
        <Button
          type='link'
          href='/trash/equipments'
          icon={<DeleteOutlined style={{ fontSize: 12, color: '#1890ff', marginRight: '10px !important' }} />}>
          Go to Trash
        </Button>
      </div>
      <CreateEquipmentForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false)
        }}
      />
    </>
  )
}

export default CreateEquipment