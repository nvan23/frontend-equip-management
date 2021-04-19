import axios from 'axios'

import { getConfig } from '../helpers/handleHeader'

const { REACT_APP_API_URL } = process.env

export {
  getAllEquipmentsWithNameAndId,
  getAllEquipments,
  getAllDeletedEquipments,
  getEquipments,
  getEquipment,
  createEquipment,
  editEquipment,
  deleteEquipment,
  restoreEquipment,
  forceDeleteEquipment,
}

function getAllEquipmentsWithNameAndId () {
  return axios.get(`${REACT_APP_API_URL}/equipments/name-id`, {}, getConfig())
}

function getAllEquipments () {
  return axios.get(`${REACT_APP_API_URL}/equipments`, {}, getConfig())
}

function getAllDeletedEquipments () {
  return axios.get(`${REACT_APP_API_URL}/trash`, {}, getConfig())
}

function getEquipments () {
  return axios.get(`${REACT_APP_API_URL}/user/equipments`, {}, getConfig())
}

function getEquipment (equipmentId) {
  return axios.get(`${REACT_APP_API_URL}/equipments/${equipmentId}`, {}, getConfig())
}

function createEquipment (name, type, description) {
  return axios.post(`${REACT_APP_API_URL}/equipments`,
    {
      "type": type,
      "name": name,
      "description": description,
    },
    getConfig()
  )
}

function editEquipment (equipmentId, name, type, description) {
  return axios.put(`${REACT_APP_API_URL}/equipments/${equipmentId}`,
    {
      "type": type,
      "name": name,
      "description": description,
    }, getConfig())
}

function deleteEquipment (equipmentId) {
  return axios.delete(`${REACT_APP_API_URL}/equipments/${equipmentId}`, {}, getConfig())
}

function restoreEquipment (equipmentId) {
  return axios.put(`${REACT_APP_API_URL}/trash/${equipmentId}`, {}, getConfig())
}

function forceDeleteEquipment (equipmentId) {
  return axios.delete(`${REACT_APP_API_URL}/trash/${equipmentId}`, {}, getConfig())
}