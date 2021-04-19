import React, { useState } from 'react'
import { Redirect, useHistory, Link } from 'react-router-dom'

import { ExclamationCircleOutlined } from '@ant-design/icons'

import { removeToken } from '../utils/localStorage'

import {
  Modal
} from 'antd'

const RequestLogin = () => {
  const [visible, setVisible] = useState(true)
  const [confirmLoading, setConfirmLoading] = useState(false);
  const history = useHistory()

  const handleOk = () => {
    setVisible(false)
    setConfirmLoading(false)
    removeToken()
    window.location = '/login'

  }
  const handleCancel = () => {
    setVisible(false)
    removeToken()
    window.location = '/'
  }

  return (
    <Modal
      title='Request Login Again'
      centered
      visible={visible}
      icon={<ExclamationCircleOutlined />}
      confirmLoading={confirmLoading}
      onOk={handleOk}
      onCancel={handleCancel}
      cancelText='Back to home'
    >
      <p>You need to login again to access this source.</p>
    </Modal>
  )
}

export default RequestLogin