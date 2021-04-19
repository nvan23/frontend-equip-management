import React from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import {
  Menu,
  Button,
  message,
} from 'antd';

import Container from 'react-bootstrap/Container'

import { logout } from '../resolvers/auth.resolver'
import { REMOVE_USER } from '../context/auth'
import { useStore } from '../context/storeProvider';
import { removeToken } from '../utils/localStorage'

const { SubMenu } = Menu;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  height: 31px;
  margin: 16px 0;
  background: rgba(255, 255, 255, 0.3);
`;

const Logo = styled.div`
  display: block;
  z-index: 1;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 0, 0, 0.3);
`;

const MenuContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const Nav = ({ user }) => {

  const history = useHistory()
  const [{ auth }, dispatch] = useStore();

  function handleLogout () {
    logout()
      .then(response => {
        dispatch({
          type: REMOVE_USER,
        })
        removeToken()
        message.success('Logged out successfully')
        return < Redirect to='/' />
      })
      .catch(error => {
        message.error('Failed to log out')
      })
  }
  return (
    <Container>

      <NavContainer>

        <div>
          <Link to="/"><Logo /></Link>
        </div>
        <MenuContainer>
          <Menu
            inlineIndent={40}
            mode="horizontal"
            style={{ border: 0 }}>

            <Menu.Item key="todos">
              <Link to="/todos">Todo</Link>
            </Menu.Item>

            <Menu.Item key="equipments">
              <Link to="/equipments">Equipments</Link>
            </Menu.Item>

            <Menu.Item key="tickets">
              <Link to="/tickets">Tickets</Link>
            </Menu.Item>

            {user ? (
              <SubMenu
                key="account"
                title={user.name}
                subMenuCloseDelay={0.5}
                subMenuOpenDelay={0.5}
              >
                <Menu.Item key="profile">
                  <Link to="/profile">Profile</Link>
                </Menu.Item>
                <Menu.Item key="signout">
                  <Button onClick={() => handleLogout()}>Sign out</Button>
                </Menu.Item>
              </SubMenu>
            ) : (
              <>
                <Menu.Item key="login">
                  <Link to="/login">Login</Link>
                </Menu.Item>
                <Menu.Item key="register">
                  <Link to="/register">Register</Link>
                </Menu.Item>
              </>
            )}

          </Menu>
        </MenuContainer>

      </NavContainer>
    </Container>

  )
}

export default Nav