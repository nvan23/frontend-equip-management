const TODOS_STORAGE_KEY = 'TODOS'
const CURRENT_PATH_STORAGE_KEY = 'CURRENT_PATH'

export default {
  get () {
    return JSON.parse(localStorage.getItem(TODOS_STORAGE_KEY)) || []
  },
  getCurrentPath () {
    return JSON.parse(localStorage.getItem(CURRENT_PATH_STORAGE_KEY)) || []
  },
  set (todos) {
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos))
  },
  setCurrentPath (currentPath) {
    localStorage.setItem(CURRENT_PATH_STORAGE_KEY, JSON.stringify(currentPath))
  }
}