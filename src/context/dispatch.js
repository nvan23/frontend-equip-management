
function setUser (user) {
  dispatch({
    type: "SET_USER",
    payload: user
  });
}

function removeUser () {
  dispatch({
    type: "REMOVE_USER",
  })
}

function login (email, password) {
  dispatch({
    type: "LOGIN",
    payload: {
      email,
      password
    }
  });
}

function addEquipment (equipment) {
  dispatch({
    type: "ADD_EQUIPMENT",
    payload: equipment
  });
}

function editEquipment (equipment) {
  dispatch({
    type: "EDIT_EQUIPMENT",
    payload: equipment
  });
}

function removeEquipment (id) {
  dispatch({
    type: "REMOVE_EQUIPMENT",
    payload: id
  });
}
