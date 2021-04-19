import { getToken } from '../utils/localStorage'

/**
 * Actions types
 */
export const SET_USER = 'SET_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const LOGIN = 'LOGIN';

/**
 * Initial State
 */
export const authInitialState = {
  user: null,
  token: getToken() || null,
};

export function authReducer (state, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      }

    case REMOVE_USER:
      return {
        ...state,
        user: null,
        token: null,
      }

    default:
      return state;
  }
};