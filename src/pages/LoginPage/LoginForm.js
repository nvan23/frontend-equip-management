import React from 'react'
import { Link } from 'react-router-dom';

import { useAuth } from '../../helpers/useAuth'

import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
} from 'antd';

import {
  MailOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from '@ant-design/icons';

const LoginForm = () => {
  const auth = useAuth()

  const onFinish = ({ email, password }) => {
    auth.signin(email, password)
  };

  return (
    <Form
      name="login-form"
      onFinish={onFinish}
    >

      <Form.Item
        name="email"
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

      <Form.Item>
        <Row wrap={false} justify='space-between'>
          <Col>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Col>
          <Col>
            <a href="/">
              Forgot password
            </a>
          </Col>
        </Row>
      </Form.Item>

      <Form.Item>
        <Row gutter={[30, 8]} style={{ flexDirection: 'column', textAlign: 'center' }}>
          <Col>
            <Button type="primary" htmlType="submit" block>
              Log in
            </Button>
          </Col>
          <Col>
            Or <Link to="/register">register now</Link>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default LoginForm