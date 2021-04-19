import { getToken } from '../utils/localStorage'

export {
  getConfig
}

function getConfig () {
  return {
    headers: {
      'x-access-token': getToken() || null,
      'Content-Type': 'application/json'
    }
  }
}