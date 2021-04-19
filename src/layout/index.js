import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';

import { useStore } from '../context/storeProvider'
import { getToken, removeToken } from '../utils/localStorage'
import { getUser, isJwtExpired } from '../resolvers/auth.resolver'
import { SET_USER, REMOVE_USER } from '../context/auth'
import { applyInterceptors } from '../services/axios'

import { Layout, Breadcrumb } from 'antd'

import Container from 'react-bootstrap/Container'

import { PrivateRoute } from '../components/PrivateRoute';

import LoginPage from '../pages/LoginPage';
import ProfilePage from '../pages/ProfilePage';
import RegisterPage from '../pages/RegisterPage';
import HomePage from '../pages/HomePage';
import TodosPage from '../pages/TodosPage';
import EquipmentsPage from '../pages/EquipmentsPage';
import EquipmentTrashPage from '../pages/EquipmentTrashPage';
import TicketsPage from '../pages/TicketsPage';
import TicketsTrashPage from '../pages/TicketsTrashPage';
import NotFoundPage from '../pages/NotFoundPage';

import Nav from './Nav'
import RequestLogin from '../components/RequestLogin'

const LayoutContent = styled.div`
  padding: 24px;
  background: #fff;
  min-height: 470px;
`;

const { Header, Content, Footer } = Layout

const AppLayout = () => {
  const [{ auth }, dispatch] = useStore()

  useEffect(() => {
    // applyInterceptors()
    if (isJwtExpired()) {
      dispatch({
        type: REMOVE_USER,
      })
      return <RequestLogin />

    } else {
      const token = getToken()
      getUser()
        .then(response => {
          dispatch({
            type: SET_USER,
            payload: {
              user: response.data,
              token: token
            }
          });
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [])

  return (
    <>
      <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>


        {/* Header */}
        <Header
          style={{
            width: '100%',
            backgroundColor: '#fff'
          }}
        >
          <Nav user={auth.user} />
        </Header>

        {/* Container */}

        <Content style={{ flex: 1 }}>
          <Container>

            <Breadcrumb style={{ margin: '16px' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>

            <LayoutContent>
              <Switch>
                <Route exact path="/todos" component={TodosPage} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/register" component={RegisterPage} />
                <PrivateRoute exact path="/profile" component={ProfilePage} />
                <PrivateRoute exact path="/equipments" component={EquipmentsPage} />
                <PrivateRoute exact path="/trash/equipments" component={EquipmentTrashPage} />
                <PrivateRoute exact path="/tickets" component={TicketsPage} />
                <PrivateRoute exact path="/trash/tickets" component={TicketsTrashPage} />
                <Route exact path="/" component={HomePage} />
                <Route path="/" component={NotFoundPage} />
              </Switch>
            </LayoutContent>

          </Container>
        </Content>

        {/* Footer */}
        <Footer
          style={{
            textAlign: 'center',
            width: '100%',
            backgroundColor: '#fff',
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </>
  );
}

export default AppLayout
