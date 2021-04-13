const TODOS_STORAGE_KEY = 'TODOS'
const CURRENT_PATH_STORAGE_KEY = 'CURRENT_PATH'
const TOKEN = 'token'

export {
  getTodos,
  getCurrentPath,
  getToken,
  setTodos,
  setCurrentPath,
  setToken,
  removeToken,
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

function setTodos (todos) {
  localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos))
}

function setCurrentPath (currentPath) {
  localStorage.setItem(CURRENT_PATH_STORAGE_KEY, JSON.stringify(currentPath))
}

function setToken (token) {
  localStorage.setItem(TOKEN, JSON.stringify(token))
}

function removeToken () {
  localStorage.removeItem(TOKEN)
}