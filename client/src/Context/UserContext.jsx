import React from "react";
import AuthApi from "../Api/AuthApi";
import * as ACTION_TYPES from '../Configs/ActionTypes'
var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true };
    case ACTION_TYPES.LOGIN_FAILURE:
      return { ...state, isAuthenticated: false };
    case ACTION_TYPES.LOGOUT_SUCCESS:
      return { ...state, isAuthenticated: false };
    case ACTION_TYPES.LOGOUT_FAILURE:
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("token"),
  });
  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut, signUp, changePassword };

// ###########################################################

async function loginUser(dispatch, email, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);
  if (!!email && !!password) {
    let response = await AuthApi.login(email, password);
    if(response && response.data && response.data.user){
      const user = response.data.user
      if(user.token){
        setError(null);
        setIsLoading(false);
        dispatch({ type:  ACTION_TYPES.LOGIN_SUCCESS, payload: user});
      }
    } else {
      setError(true);
      setIsLoading(false);
      localStorage.removeItem("token");
      history.push('/login')
    }
  } else {
    setError(true);
    setIsLoading(false);
  }
}
async function signUp(dispatch, user, history, setIsLoading, setError) {
  setError(false);
  // setIsLoading(true);
  if(!!user){
    let response = await AuthApi.register(user)

    if(response.user){
      const user = response.user
      if(user.token){
        localStorage.setItem("token", user.token);
        history.push('/dashboard');
        setError(null);
        setIsLoading(false);
        dispatch({ type:  ACTION_TYPES.LOGIN_SUCCESS});
      }
    } else {
      dispatch({ type: ACTION_TYPES.LOGIN_FAILURE });
      setError(true);
      setIsLoading(false);
    }
  }
}
async function signOut(dispatch, history) {
  /*let response = await AuthApi.logout()
  if(response.status){
  }*/
  localStorage.removeItem("token");
  dispatch({ type: ACTION_TYPES.LOGOUT_SUCCESS });
  history.push("/login");
}
async function changePassword(dispatch, email, history){

}