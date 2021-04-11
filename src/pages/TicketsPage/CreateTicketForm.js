import React, { useState, useEffect } from 'react';

import {
  Modal,
  Form,
} from 'antd'

import AutoCompleteInput from './AutoCompleteInput'

const CreateTicketForm = ({ visible, onCreate, onCancel, dataSource }) => {
  const [form] = Form.useForm();
  const [selectedUser, setSelectedUser] = useState('')
  const [selectedEquip, setSelectedEquip] = useState('')

  const onSelectUser = (value) => {
    setSelectedUser(value)
    form.setFieldsValue(Object.assign(form.getFieldsValue(true), { userId: value }))
  };

  const onSelectEquipment = (value) => {
    setSelectedEquip(value)
    form.setFieldsValue(Object.assign(form.getFieldsValue(true), { equipmentId: value }))
  }

  return (
    <Modal
      visible={visible}
      title="Create an new ticket"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
      >

        {/* Field to choose user */}
        <Form.Item
          name="userId"
          label="Username"
          value={selectedUser}
          rules={[
            {
              required: true,
              message: 'Please choose an user',
            },
          ]}
        >
          {<AutoCompleteInput
            arrData={dataSource[0]}
            placeholder='type any to find user'
            onSelectValue={onSelectUser}
          />}

        </Form.Item>

        {/* Field to choose equipment */}
        <Form.Item
          name="equipmentId"
          label="Equipment"
          value={selectedEquip}
          rules={[
            {
              required: true,
              message: 'Please choose an equipment',
            },
          ]}
        >
          {<AutoCompleteInput
            arrData={dataSource[1]}
            placeholder='type any to find equipment'
            onSelectValue={onSelectEquipment}
          />}
        </Form.Item>

      </Form>
    </Modal>
  );
};

export default CreateTicketForm