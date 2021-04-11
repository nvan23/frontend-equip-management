/*
 * LoginPage
 *
 * This is the first thing users see of our App, at the '/todo' route
 */

import React from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../helpers/useAuth'
import storage from '../../utils/localStorage'

import {
  Card,
  Row,
  Col,
} from 'antd';

import LoginForm from './LoginForm'

const LoginPage = () => {
  const auth = useAuth()
  let history = useHistory()

  if (auth.user) {
    history.push(storage.getCurrentPath())
  }

  return (
    <Row wrap={false} justify='center' align='center' gutter={[16, 16]}>
      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
        <Card title='Sign in to explore more'>
          <LoginForm />
        </Card>
      </Col>
    </Row>
  );
}

LoginPage.propTypes = {
};

export default LoginPage
