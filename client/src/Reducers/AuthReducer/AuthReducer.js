import * as ACTION_TYPES from '../../Actions/AuthAction/ActionTypes'

export const initialState = {
  isAuthenticated: false,
  profile: null
}

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true
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