import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';

import { useStore } from '../context/storeProvider'
import { getToken } from '../utils/localStorage'
import { SET_USER, REMOVE_USER } from '../context/auth'

import RequestLogin from '../components/RequestLogin'

import {
  setCurrentPath
} from '../utils/localStorage'
import { getUser } from '../resolvers/auth.resolver';


export const PrivateRoute = ({ component: Component, ...rest }) => {
  const [{ auth }, dispatch] = useStore()
  useEffect(() => {
    if (!auth) {
      const token = getToken()
      //todo restore token
      token && getUser()
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
  const currentPath = rest.path
  setCurrentPath(currentPath)

  return (
    <Route {...rest} render={props => (
      auth.user
        ? < Component {...props} />
        : <RequestLogin />
    )
    } />
  )
}