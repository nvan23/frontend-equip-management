import axios from 'axios'

import {
  getToken,
  getRefreshToken,
  setToken,
  setRefreshToken,
} from '../utils/localStorage'
const { REACT_APP_API_URL } = process.env

export {
  applyInterceptors
}

function applyInterceptors () {
  // Add a request interceptor
  axios.interceptors.request.use(
    config => {
      const token = getToken()
      if (token) {
        config.headers['x-access-token'] = token;
        config.headers['Content-Type'] = 'application/json';
      }
      return config;
    },
    error => {
      Promise.reject(error)
    });

  // Add a response interceptor
  axios.interceptors.response.use(
    (response) => {
      return response
    },
    function (error) {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {

        originalRequest._retry = true;
        return axios.post(`${REACT_APP_API_URL}/auth/token`,
          {
            "refreshToken": getRefreshToken()
          })
          .then(res => {
            if (res.status === 201) {
              // put token and refresh to LocalStorage
              setToken(res.data.token)
              setRefreshToken(res.data.refreshToken)

              // change authentication header
              axios.defaults.headers['x-access-token'] = getToken()

              // return originalRequest object with Axios.
              return axios(originalRequest);
            }
          })
      }
    }

  )
}
