import React, { useHistory } from 'react'
import { Link } from 'react-router-dom';

import { register } from '../../resolvers/auth.resolver'

import {
  Form,
  Input,
  Button,
  Row,
  Col,
  message,
} from 'antd';

import {
  UserOutlined,
  MailOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from '@ant-design/icons';

const RegisterForm = () => {

  const history = useHistory()

  const onFinish = ({ name, email, password }) => {
    register(name, email, password)
      .then(() => {
        message.success('Register successfully')
        history.push('/login')
      })
      .catch(() => {
        message.error('Failed to register')
      })
  };

  return (
    <Form
      name="registerForm"
      onFinish={onFinish}
    >

      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input your name!',
          },
        ]}
      >
        <Input
          allowClear
          suffix={<UserOutlined />}
          placeholder="Name" />

      </Form.Item>

      <Form.Item
        name='email'
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your Email!',
          },
        ]}
      >
        <Input
          allowClear
          type='email'
          suffix={<MailOutlined />}
          placeholder="Email" />

      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
          {
            min: 7,
            message: 'Please enter at least 7 characters.'
          }
        ]}
      >
        <Input.Password
          allowClear
          type="password"
          placeholder="Password"
          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          {
            min: 7,
            message: 'Please enter at least 7 characters.'
          },
          ({ getFieldValue }) => ({
            validator (_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password
          style={{ alignItems: 'center' }}
          allowClear
          type="password"
          placeholder="Confirm Password"
          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </Form.Item>

      <Form.Item>
        <Row gutter={[30, 8]} style={{ flexDirection: 'column', textAlign: 'center' }}>
          <Col>
            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
          </Col>
          <Col>
            Or <Link to="/login">login now</Link>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm