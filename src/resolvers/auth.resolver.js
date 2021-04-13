import { message } from "antd"
import { getToken } from '../utils/localStorage'
import axios from 'axios'

const { REACT_APP_API_URL } = process.env

export {
  register,
  login,
  logout,
  getUser,
}

/**
 * AXIOS - POST - REGISTER
 *
 * @param {string} name
 * @param {string} email
 * @param {string} password
 */

function register (name, email, password) {
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

  return fetch(`${REACT_APP_API_URL}/user/register`, requestOptions)
    .then(response => {
      response.ok
        ? message.success(`Register successfully.`)
        : message.error(`Register failed.`)
    })
    .catch(() => {
      message.error(`Register failed.`)
      window.location.reload()
    });
};

/**
 * AXIOS - POST - LOGIN
 *
 * @param {string} email
 * @param {string} password
 */

function login (email, password) {
  return axios.post(
    `${REACT_APP_API_URL}/user/login`,
    {
      "email": email,
      "password": password
    }
  )
};

/**
 * AXIOS - POST - LOGOUT
 *
 */
function logout () {
  return axios.post(`${REACT_APP_API_URL}/user/me/logout`)
};

/**
 * AXIOS - POST - LOGOUT
 *
 */
function getUser () {
  return axios.get(`${REACT_APP_API_URL}/user/me`,
    {
      headers: {
        'x_authorization': getToken()
      }
    }
  )
};