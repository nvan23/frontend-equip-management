import axios from 'axios'

import { getConfig } from '../helpers/handleHeader'

const { REACT_APP_API_URL } = process.env

export {
  getAllDeletedEquipments,
  restoreEquipment,
  forceDeleteEquipment,
}

function getAllDeletedEquipments () {
  return axios.get(`${REACT_APP_API_URL}/trash`, {}, getConfig())
}

function restoreEquipment (equipmentId) {
  return axios.put(`${REACT_APP_API_URL}/trash/${equipmentId}`, {}, getConfig())
}

function forceDeleteEquipment (equipmentId) {
  return axios.delete(`${REACT_APP_API_URL}/trash/${equipmentId}`, {}, getConfig())
}