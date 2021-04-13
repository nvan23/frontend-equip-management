import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import { useStore } from '../context/storeProvider';
import { getToken } from '../utils/localStorage'
import { getUser } from '../resolvers/auth.resolver'
import { SET_USER } from '../context/auth'

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

const LayoutContent = styled.div`
  padding: 24px;
  background: #fff;
  min-height: 470px;
`;

const { Header, Content, Footer } = Layout

const AppLayout = () => {
  const [{ auth }, dispatch] = useStore()

  useEffect(() => {
    if (getToken()) {
      getUser()
        .then(response => {
          dispatch({
            type: SET_USER,
            payload: {
              user: response.data,
              token: getToken()
            }
          });
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [dispatch])

  return (
    <Layout>

      {/* Header */}
      <Header
        style={{
          position: 'fixed',
          zIndex: 10,
          width: '100%',
          backgroundColor: '#fff'
        }}
      >
        <Nav user={auth.user} />
      </Header>

      {/* Container */}
      <Container>

        <Content style={{ marginTop: 80 }}>

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

        </Content>
      </Container>

      {/* Footer */}
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  );
}

export default AppLayout
