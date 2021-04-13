const { REACT_APP_API_URL } = process.env;

const tokenString = sessionStorage.getItem('token');
const token = JSON.parse(tokenString);

export const getAllUsersWithNameAndId = () => {
  const myHeaders = new Headers();
  myHeaders.append("x_authorization", token);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  return fetch(`${REACT_APP_API_URL}/users`, requestOptions)
    .then(response => response.json())
    .then(data => {
      return data
    })
    .catch(error => {
      console.warn('error', error)
    })
}