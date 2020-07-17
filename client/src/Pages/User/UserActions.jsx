import {
  GET_USERS,
  SET_USERS,
  GET_USERS_REPORT,
  SET_USERS_REPORT,
} from "../../Configs/ActionTypes";

export function getUsersAction() {
  return {
    type: GET_USERS
  };
}

export function setUsersAction(data) {
  return {
    type: SET_USERS,
    payload: data
  };
}

export function getUsersReportAction(data) {
  return {
    type: GET_USERS_REPORT,
    payload: {}
  };
}

export function setUsersReportAction(data) {
  return {
    type: SET_USERS_REPORT,
    payload: data
  };
}