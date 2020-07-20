import {getUsersAction, getUsersReportAction, setUsersAction, setUsersReportAction} from './UserActions'
import UserApi from "../../Api/UserApi";

export function getUsers(params) {
  return (dispatch) => {
    dispatch(getUsersAction());
    UserApi.getUsers(params).then(response => {
      if (response.error) {
        throw(response.error);
      }
      dispatch(setUsersAction(response.data.users));
      return response.data.users;
    })
  };
}

export function getUsersReport(params = []) {
  return (dispatch) => {
    dispatch(getUsersReportAction());
    UserApi.getUsersReport(params).then(response => {
      if (response.error) {
        throw(response.error);
      }
      dispatch(setUsersReportAction(response.data.report));
      return response.data.users;
    })
  };
}
