import AuthApi from "../../Api/AuthApi";
import * as ACTION_TYPES from "../../Configs/ActionTypes";

export function loginUser(username, password, history, setIsLoading, setError) {
  return async (dispatch) => {
    setError(false);
    setIsLoading(true);
    if (!!username && !!password) {
      dispatch({type: ACTION_TYPES.LOGIN})
      return await AuthApi.login(username, password).then((response) => {
        debugger
        if (response && response.data && response.data.user) {
          const user = response.data.user;
          localStorage.setItem("token", user.token);
          setError(null);
          setIsLoading(false);
          dispatch({type: ACTION_TYPES.LOGIN_SUCCESS});
        } else {
          setError(true);
          setIsLoading(false);
          dispatch({type: ACTION_TYPES.LOGOUT_FAILURE});
        }
      })
    } else {
      setError(true);
      setIsLoading(false);
    }
  }
}

export function signOut(dispatch, history) {
  return (dispatch) => {
    // await AuthApi.logout()
    dispatch({type: ACTION_TYPES.LOGOUT_SUCCESS});
    localStorage.removeItem("token");
    history.push("/login");
  }
}

export function verifyUser() {
  return async (dispatch) => {
    dispatch({type: ACTION_TYPES.VERIFY_USER});
    let response = await AuthApi.verifyUser()
    if (response && response.data && response.data.user) {
      dispatch({type: ACTION_TYPES.SET_USER, payload: response.data.user});
    }
  }
}

export function signUp(user, history, setIsLoading, setError) {
  return async (dispatch) => {
    setError(false);
    // setIsLoading(true);
    if (!!user) {
      let response = await AuthApi.register(user)

      if (response.user) {
        const user = response.user
        if (user.token) {
          localStorage.setItem("token", user.token);
          dispatch({type: ACTION_TYPES.LOGIN_SUCCESS});
          setError(null);
          setIsLoading(false);
        }
      } else {
        dispatch({type: ACTION_TYPES.LOGIN_FAILURE});
        setError(true);
        setIsLoading(false);
      }
    }
  }
}

export async function changePassword(dispatch, username, history) {

}