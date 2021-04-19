import React from 'react';
import { Route } from 'react-router-dom';

import { useStore } from '../context/storeProvider'

import RequestLogin from '../components/RequestLogin'

import {
  setCurrentPath
} from '../utils/localStorage'


export const PrivateRoute = ({ component: Component, ...rest }) => {
  const [{ auth }] = useStore()

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