import * as ACTION_TYPES from '../../Configs/ActionTypes'

export const initialState = {
  user: {},
  isAuthenticated: false,
  profile: null
}

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      }
    case ACTION_TYPES.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false
      }
    default:
      return state
  }
};

export default AuthReducer;