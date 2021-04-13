const { REACT_APP_API_URL } = process.env;

const isAuth = () => {
  const tokenString = sessionStorage.getItem('token');
  const token = JSON.parse(tokenString);
  let myHeaders = new Headers();
  myHeaders.append("x_authorization", token);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  return fetch(`${REACT_APP_API_URL}/user/authenticated`, requestOptions)
    .then(response => {
      return response.json()
    })
    .then(data => {
      return data
    })
    .catch(error => console.log('error', error));
}

export default isAuth