import { getToken } from '../utils/localStorage'

/**
 * Initial State
 */
export const equipInitialState = {
  user: null,
  token: getToken(),
};

export function equipmentReducer (state, action) {
  switch (action.type) {
    case "ADD_EQUIPMENT":
      return {
        ...state,
        equipments: [...state.equipments, action.payload],
      };

    case "EDIT_EQUIPMENT":
      const updatedEquipment = action.payload;

      const updatedEquipments = state.equipments.map((equipment) => {
        if (equipment.id === updatedEquipment.id) {
          return updatedEquipment;
        }
        return equipment;
      });

      return {
        ...state,
        equipments: updatedEquipments,
      };

    case "REMOVE_EQUIPMENT":
      return {
        ...state,
        equipments: state.equipments.filter(
          (equipment) => equipment.id !== action.payload
        ),
      };

    default:
      return state;
  }
};