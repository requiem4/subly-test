import {GET_USERS, GET_USERS_FAILURE, GET_USERS_REPORT, GET_USERS_SUCCESS} from '../../Configs/ActionTypes'

const initialState = {
  users: [],
  report: {
    totalUserCount: 0,
  }
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
    case GET_USERS_REPORT:
      return {
        ...state,
        pending: false,
        report: action.payload
      }
    default:
      // the dispatched action is not in this reducer, return the state unchanged
      return state;
  }
}