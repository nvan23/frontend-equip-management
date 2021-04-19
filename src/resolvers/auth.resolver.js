
import axios from 'axios'
import jwt from 'jsonwebtoken'

import { getConfig } from '../helpers/handleHeader'
import { getToken } from '../utils/localStorage'

const { REACT_APP_API_URL } = process.env

export {
  register,
  login,
  logout,
  getUser,
  isJwtExpired,
}

/**
 * AXIOS - POST - REGISTER
 *
 * @param {string} name
 * @param {string} email
 * @param {string} password
 */

function register (name, email, password) {
  return axios.post(
    `${REACT_APP_API_URL}/user/register`,
    {
      'name': name,
      "email": email,
      "password": password,
    }
  )
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
  return axios.post(`${REACT_APP_API_URL}/user/me/logout`, {}, getConfig())
};

/**
 * AXIOS - POST - GET USER
 *
 */
function getUser () {
  return axios.get(`${REACT_APP_API_URL}/user/me`, {}, getConfig())
}

/**
 * CHECK EXPIRE OF TOKEN
 *
 */
function isJwtExpired () {
  const token = getToken() || null

  if (!token) return token

  jwt.verify(token, '', function (err, decoded) {
    if (err) {
      return true
    }
  })
  return false
}