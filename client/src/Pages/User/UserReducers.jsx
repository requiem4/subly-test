import {GET_USERS, GET_USERS_REPORT, SET_USERS, SET_USERS_REPORT} from '../../Configs/ActionTypes'

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
    case SET_USERS:
      return {
        ...state,
        pending: false,
        users: action.payload
      }
    case GET_USERS_REPORT:
      return {
        ...state,
        pending: false,
      }
    case SET_USERS_REPORT:
      return {
        ...state,
        pending: false,
        report: action.payload
      }
    default:
  }
  return state;
}