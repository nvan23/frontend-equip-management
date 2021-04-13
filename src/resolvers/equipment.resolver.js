import { message } from "antd";

const { REACT_APP_API_URL } = process.env;

const tokenString = sessionStorage.getItem('token');
const token = JSON.parse(tokenString);

export const getAllEquipmentsWithNameAndId = () => {
  const myHeaders = new Headers();
  myHeaders.append("x_authorization", token);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  return fetch(`${REACT_APP_API_URL}/equipments/name-id`, requestOptions)
    .then(response => response.json())
    .then(data => {
      return data
    })
    .catch(error => {
      console.warn('error', error)
    })
}

export const getAllEquipments = () => {
  var myHeaders = new Headers();
  myHeaders.append("x_authorization", token);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  return fetch(`${REACT_APP_API_URL}/equipments`, requestOptions)
    .then(response => response.json())
    .then(data => {
      return data.equipments
    })
    .catch(error => {
      console.log('error', error)
    })
}

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

export const getEquipments = async () => {
  const myHeaders = new Headers();
  myHeaders.append("x_authorization", token);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  return await fetch(`${REACT_APP_API_URL}/user/equipments`, requestOptions)
    .then(response => {
      return response.json()
    })
    .then(data => {
      return data.equipments
    })
    .catch(error => {
      console.log('error', error)
    })
}

export const getEquipment = async (equipmentId) => {
  var myHeaders = new Headers();
  myHeaders.append("x_authorization", token);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  return await fetch(`${REACT_APP_API_URL}/equipments/${equipmentId}`, requestOptions)
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

export const createEquipment = async (name, type, description) => {
  const myHeaders = new Headers();
  myHeaders.append("x_authorization", token);
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "type": type,
    "name": name,
    "description": description,
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return await fetch(`${REACT_APP_API_URL}/equipments`, requestOptions)
    .then(response => {
      response.ok
        ? message.success(`${name} created successfully.`)
        : message.error(`Cannot to create ${name}. Try again at another time.`)

      return response.json()
    })
    .then(data => {
      return data
    })
    .catch(error => {
      console.log('error', error)
    });
}

export const editEquipment = async (equipmentId, name, type, description) => {
  const myHeaders = new Headers();
  myHeaders.append("x_authorization", token);
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "type": type,
    "name": name,
    "description": description,
  });

  const requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return await fetch(`${REACT_APP_API_URL}/equipments/${equipmentId}`, requestOptions)
    .then(response => {
      response.ok
        ? message.success(`${name} edited successfully.`)
        : message.error(`Failed to edit ${name}.`)

      return response.json()
    })
    .then(data => {
      return data
    })
    .catch(error => {
      console.log('error', error)
    });
}

export const deleteEquipment = async (equipmentId) => {
  var myHeaders = new Headers();
  myHeaders.append("x_authorization", token);

  const requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
  };

  return await fetch(`${REACT_APP_API_URL}/equipments/${equipmentId}`, requestOptions)
    .then(response => {
      response.ok
        ? message.success(`Delete successfully.`)
        : message.error(`Failed to delete.`)
    })
    .then(() => {
      window.location.reload()
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