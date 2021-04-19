const TODOS_STORAGE_KEY = 'TODOS'
const CURRENT_PATH_STORAGE_KEY = 'CURRENT_PATH'
const TOKEN = 'token'
const REFRESH_TOKEN = 'refresh_token'

export {
  getTodos,
  getCurrentPath,
  getToken,
  getRefreshToken,
  setTodos,
  setCurrentPath,
  setToken,
  setRefreshToken,
  removeToken,
  removeRefreshToken,
}

function getTodos () {
  return JSON.parse(localStorage.getItem(TODOS_STORAGE_KEY)) || []
}

function getCurrentPath () {
  return JSON.parse(localStorage.getItem(CURRENT_PATH_STORAGE_KEY)) || []
}

function getToken () {
  return JSON.parse(localStorage.getItem(TOKEN))
}

function getRefreshToken () {
  return JSON.parse(localStorage.getItem(REFRESH_TOKEN))
}

function setTodos (todos) {
  localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos))
}

function setCurrentPath (currentPath) {
  localStorage.setItem(CURRENT_PATH_STORAGE_KEY, JSON.stringify(currentPath))
}

function setToken (token) {
  localStorage.setItem(TOKEN, JSON.stringify(token))
}

function setRefreshToken (token) {
  localStorage.setItem(REFRESH_TOKEN, JSON.stringify(token))
}

function removeToken () {
  localStorage.removeItem(TOKEN)
}

function removeRefreshToken () {
  localStorage.removeItem(REFRESH_TOKEN)
}