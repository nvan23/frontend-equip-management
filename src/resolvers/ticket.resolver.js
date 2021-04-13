import { message } from "antd";

const { REACT_APP_API_URL } = process.env;

const tokenString = sessionStorage.getItem('token');
const token = JSON.parse(tokenString);

export const getAllTickets = () => {
  const myHeaders = new Headers();
  myHeaders.append("x_authorization", token);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  return new Promise((resolve, reject) => {
    fetch(`${REACT_APP_API_URL}/tickets`, requestOptions)
      .then(response => {
        if (response.status === 400) {
          return reject("Bad request")
        }
        response.json()
      })
      .then(data => {
        resolve(data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export const getAllDeletedTickets = async () => {
  var myHeaders = new Headers();
  myHeaders.append("x_authorization", token);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  return await fetch(`${REACT_APP_API_URL}/tickets/trash/`, requestOptions)
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

export const getTickets = async () => {
  const myHeaders = new Headers();
  myHeaders.append("x_authorization", token);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  return await fetch(`${REACT_APP_API_URL}/user/tickets`, requestOptions)
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

export const getTicket = async (ticketId) => {
  var myHeaders = new Headers();
  myHeaders.append("x_authorization", token);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  return await fetch(`${REACT_APP_API_URL}/tickets/${ticketId}`, requestOptions)
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

export const createTicket = (userId, equipmentId) => {
  const myHeaders = new Headers();
  myHeaders.append("x_authorization", token);
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "userId": userId,
    "equipmentId": equipmentId,
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return fetch(`${REACT_APP_API_URL}/tickets`, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw Error(response);
      }
      return response.json()
    })
    .then(data => {
      message.success(`Ticket created successfully.`)
      return data
    })
    .catch(error => {
      message.error(`Cannot to create. Try again at another time.${error.toString()}`)
      console.warn('error', error)
    })
}

export const editTicket = async (ticketId, name, type, description) => {
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

  return await fetch(`${REACT_APP_API_URL}/tickets/${ticketId}`, requestOptions)
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

export const deleteTicket = (ticketId) => {
  const myHeaders = new Headers();
  myHeaders.append("x_authorization", token);

  const requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
  };

  return fetch(`${REACT_APP_API_URL}/tickets/${ticketId}`, requestOptions)
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

export const restoreTicket = (ticketId) => {
  var myHeaders = new Headers();
  myHeaders.append("x_authorization", token);

  const requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    redirect: 'follow'
  };

  return fetch(`${REACT_APP_API_URL}/tickets/trash/${ticketId}`, requestOptions)
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

export const forceDeleteTicket = (ticketId) => {
  var myHeaders = new Headers();
  myHeaders.append("x_authorization", token);

  const requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
  };

  return fetch(`${REACT_APP_API_URL}/tickets/trash/${ticketId}`, requestOptions)
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