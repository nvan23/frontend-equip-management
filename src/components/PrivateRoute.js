import React from 'react';
import { Route, useHistory } from 'react-router-dom';

import { useAuth } from '../helpers/useAuth'
import storage from '../utils/localStorage'


export const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useAuth()
  let history = useHistory()

  const currentUser = auth.user
  const currentPath = rest.path

  storage.setCurrentPath(currentPath)

  return (
    <Route {...rest} render={props => (
      currentUser
        ? < Component {...props} user={currentUser} />
        : history.push('/login')
    )} />
  )
}