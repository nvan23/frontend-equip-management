import React, { useState, useEffect, useContext, createContext } from "react"
import { useHistory } from 'react-router-dom';
import useToken from './useToken'

import {
  message
} from 'antd'

const { REACT_APP_API_URL } = process.env;

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth ({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth () {
  let history = useHistory()
  const [user, setUser] = useState(null)
  const { token, setToken, removeToken } = useToken()

  const signin = (email, password) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "email": email,
      "password": password
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${REACT_APP_API_URL}/user/login`, requestOptions)
      .then(response => {
        response.ok
          ? message.success(`Login successfully.`)
          : message.error(`Login failed.`)

        return response.json()
      })
      .then(data => {
        setToken(data.accessToken)
        setUser(data.user)
        window.location.reload()
      })
      .catch(error => {
        message.error(`Login failed.`)
        removeToken()
        window.location.reload()
      });

    return user
  };

  const register = (name, email, password) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "name": name,
      "email": email,
      "password": password
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`${REACT_APP_API_URL}/user/register`, requestOptions)
      .then(response => {
        response.ok
          ? message.success(`Register successfully.`)
          : message.error(`Register failed.`)
      })
      .then(() => {
        history.push('/login')
      })
      .catch(() => {
        message.error(`Register failed.`)
        window.location.reload()
      });
  };

  const signout = () => {
    const myHeaders = new Headers();
    myHeaders.append("x_authorization", token);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: '',
      redirect: 'follow'
    };

    fetch(`${REACT_APP_API_URL}/me/logout`, requestOptions)
      .then(response => {
        !response.ok
          ? message.success(`Sign out successfully.`)
          : message.error(`Sign out failed.`)
        removeToken()
        setUser(false)
        history.push('/login')
      })
      .catch(error => error)
    return user
  };


  useEffect(() => {
    if (!token) {
      setUser(false)
      history.push('/login')
      return;
    }

    const fetchProfileUser = () => {
      let myHeaders = new Headers();
      myHeaders.append("x_authorization", token);

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      return fetch(`${REACT_APP_API_URL}/user/me`, requestOptions)
        .then(response => {
          return response.json()
        })
        .then(data => {
          if (!user) {
            setUser(data)
          }
        })
        .catch(error => console.log('error', error));
    }

    fetchProfileUser();

  }, [token, history, user]);


  // Return the user object and auth methods
  return {
    user,
    signin,
    register,
    signout,
  };
}