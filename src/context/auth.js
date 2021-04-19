import { getToken } from '../utils/localStorage'
import { isJwtExpired, getUser } from '../resolvers/auth.resolver'

/**
 * Actions types
 */
export const SET_USER = 'SET_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const LOGIN = 'LOGIN';

// const _getUser = async () => {
//   let user = { null };
//   try {
//     user = await getUser()
//   } catch (err) {
//     //Todo
//   }
//   return user
// }

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
        user: null,
        token: null,
      }

    default:
      return state;
  }
};