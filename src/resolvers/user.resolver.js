import axios from 'axios'

import { getConfig } from '../helpers/handleHeader'

const { REACT_APP_API_URL } = process.env

export const getAllUsersWithNameAndId = () => {
  return axios.get(`${REACT_APP_API_URL}/users`, {}, getConfig())
}