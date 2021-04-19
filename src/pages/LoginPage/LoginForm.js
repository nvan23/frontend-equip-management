import React from 'react'
import { Link, useHistory } from 'react-router-dom';

import { useStore } from '../../context/storeProvider';
import { SET_USER } from '../../context/auth'
import {
  setToken,
  setRefreshToken,
} from '../../utils/localStorage'

import { login } from '../../resolvers/auth.resolver'

import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  message,
} from 'antd';

import {
  MailOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from '@ant-design/icons';

const LoginForm = () => {

  const history = useHistory()
  const [{ auth }, dispatch] = useStore();

  const onFinish = ({ email, password }) => {
    login(email, password)
      .then(response => {
        message.success('Logged in successfully')
        dispatch({
          type: SET_USER,
          payload: response.data
        });
        setToken(response.data.token)
        setRefreshToken(response.data.refreshToken)
        history.push('/profile')
      })
      .catch((error) => {
        error.response.status === 404
          ? message.error(error.response.data.msg)
          : message.error('Failed when trying log in')
      })

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