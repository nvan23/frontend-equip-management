import { message } from "antd";

const { REACT_APP_API_URL } = process.env;

const tokenString = sessionStorage.getItem('token');
const token = JSON.parse(tokenString);

export const getAllDeletedEquipments = async () => {
  var myHeaders = new Headers();
  myHeaders.append("x_authorization", token);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  return await fetch(`${REACT_APP_API_URL}/trash`, requestOptions)
    .then(response => {
      return response.json()
    })
    .then(data => {
      return data
    })
    .catch(error => {
      console.log('error', error)
    })
}

export const restoreEquipment = async (equipmentId) => {
  var myHeaders = new Headers();
  myHeaders.append("x_authorization", token);

  const requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    redirect: 'follow'
  };

  return await fetch(`${REACT_APP_API_URL}/trash/${equipmentId}`, requestOptions)
    .then(response => {
      response.ok
        ? message.success(`Restore successfully.`)
        : message.error(`Failed to restore.`)
      return response.json()
    })
    .then(() => {
      window.location.reload()
    })
    .catch(error => {
      console.log('error', error)
    })
}

export const forceDeleteEquipment = async (equipmentId) => {
  var myHeaders = new Headers();
  myHeaders.append("x_authorization", token);

  const requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
  };

  return await fetch(`${REACT_APP_API_URL}/trash/${equipmentId}`, requestOptions)
    .then(response => {
      response.ok
        ? message.success(`Remove equipment successfully.`)
        : message.error(`Failed to remove.`)
    })
    .then(() => {
      window.location.reload()
    })
    .catch(error => {
      console.log('error', error)
    })
}