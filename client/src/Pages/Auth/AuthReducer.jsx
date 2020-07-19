import * as ACTION_TYPES from '../../Configs/ActionTypes'
import {getUserFromJwt} from "./AuthHelpers";


const user = getUserFromJwt()
const initialState = {
  user: user,
  isAuthenticated: user.id ? !!localStorage.getItem("token") : false,
  profile: null
}

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_SUCCESS:

      return {
        ...state,
        user: getUserFromJwt(),
        isAuthenticated: true
      }
    case ACTION_TYPES.LOGIN_FAILURE:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false
      }
    case ACTION_TYPES.LOGOUT_SUCCESS:
      return {...state, isAuthenticated: false};
    case ACTION_TYPES.LOGOUT_FAILURE:
      return {...state, isAuthenticated: false};
    case ACTION_TYPES.VERIFY_USER:
      return {...state, user: {}};
    case ACTION_TYPES.SET_USER:
      return {...state, user: action.payload};
    default:
      return state
  }
};

export default AuthReducer;