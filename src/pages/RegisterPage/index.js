/*
 * RegisterPage
 *
 * This is the first thing users see of our App, at the '/todo' route
 */

import React from 'react';

import {
  Card,
  Row,
  Col,
} from 'antd';

import RegisterForm from './RegisterForm'

const RegisterPage = () => {

  return (
    <Row wrap={false} justify='center' align='center' gutter={[16, 16]}>
      <Col xs={24} sm={24} md={24} lg={12} xl={12}>
        <Card title='Join us to make a difference'>
          <RegisterForm />
        </Card>
      </Col>
    </Row>
  );
}

RegisterPage.propTypes = {
};

export default RegisterPage
