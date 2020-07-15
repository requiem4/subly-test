import {GET_USERS, GET_USERS_FAILURE, GET_USERS_SUCCESS} from "../../Configs/ActionTypes";

export function getUsersAction() {
  return {
    type: GET_USERS
  };
}
export function getUsersSuccessAction(data) {
  return {
    type: GET_USERS_SUCCESS,
    payload: data
  };
}
export function getUsersFailureAction(data) {
  return {
    type: GET_USERS_FAILURE,
    error: data
  };
}