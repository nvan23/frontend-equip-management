import React from 'react';
import { Modal, Form, Input, Radio } from 'antd';

const EquipmentForm = ({ visible, equipment, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const { TextArea } = Input

  const {
    name,
    type,
    description,
  } = equipment

  return (
    <Modal
      visible={visible}
      title="Edit an equipment"
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
        name="form_in_modal"
        initialValues={{
          name: name,
          type: type,
          description: description,
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please input the title of collection!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <TextArea
            placeholder="No description."
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
        </Form.Item>
        <Form.Item name="type">
          <Radio.Group>
            <Radio value="laptop">Laptop</Radio>
            <Radio value="pc">PC</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EquipmentForm