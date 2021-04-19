import axios from 'axios'

import { getConfig } from '../helpers/handleHeader'

const { REACT_APP_API_URL } = process.env

export {
  getAllTickets,
  getAllDeletedTickets,
  getTickets,
  getTicket,
  createTicket,
  editTicket,
  deleteTicket,
  restoreTicket,
  forceDeleteTicket,
}

function getAllTickets () {
  return axios.get(`${REACT_APP_API_URL}/tickets`, {}, getConfig())
}

function getAllDeletedTickets () {
  return axios.get(`${REACT_APP_API_URL}/tickets/trash/`, {}, getConfig())
}

function getTickets () {
  return axios.get(`${REACT_APP_API_URL}/user/tickets`, {}, getConfig())
}

function getTicket (ticketId) {
  return axios.get(`${REACT_APP_API_URL}/tickets/${ticketId}`, {}, getConfig())
}

function createTicket (userId, equipmentId) {
  return axios.post(`${REACT_APP_API_URL}/tickets`,
    {
      "userId": userId,
      "equipmentId": equipmentId,
    }, getConfig())
}

function editTicket (ticketId, name, type, description) {
  return axios.put(`${REACT_APP_API_URL}/tickets/${ticketId}`,
    {
      "type": type,
      "name": name,
      "description": description,
    }, getConfig())
}

function deleteTicket (ticketId) {
  return axios.delete(`${REACT_APP_API_URL}/tickets/${ticketId}`, {}, getConfig())
}

function restoreTicket (ticketId) {
  return axios.put(`${REACT_APP_API_URL}/tickets/trash/${ticketId}`, {}, getConfig())
}

function forceDeleteTicket (ticketId) {
  return axios.delete(`${REACT_APP_API_URL}/tickets/trash/${ticketId}`, {}, getConfig())
}