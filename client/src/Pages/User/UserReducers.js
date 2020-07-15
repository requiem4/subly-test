import {GET_USERS, GET_USERS_FAILURE, GET_USERS_SUCCESS} from '../../Configs/ActionTypes'

const initialState = {
  list: []
}
export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        pending: true
      }
      break;
    case GET_USERS_SUCCESS:
      return {
        ...state,
        pending: false,
        users: action.payload
      }
      break;
    case GET_USERS_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.error
      }
    default:
      // the dispatched action is not in this reducer, return the state unchanged
      return state;
  }
}

export const getUsersSuccess = state => state.users;
export const getUsersPending = state => state.pending;
export const getUsersError = state => state.error;