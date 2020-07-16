import {getUsersAction, getUsersFailureAction, getUsersReportAction, getUsersSuccessAction} from './UserActions'
import UserApi from "../../Api/UserApi";

export function getUsers(params) {
  return (dispatch) => {
    dispatch(getUsersAction());
    UserApi.getUsers(params).then(response => {
      if (response.error) {
        throw(response.error);
      }
      dispatch(getUsersSuccessAction(response.users));
      return response.users;
    })
      .catch(error => {
        dispatch(getUsersFailureAction(error));
      })

  };
}

export function getUsersReport(params = []) {
  return (dispatch) => {
    dispatch(getUsersReportAction([]));
    UserApi.getUsersReport(params).then(response => {
      if (response.error) {
        throw(response.error);
      }
      dispatch(getUsersReportAction(response.report));
      return response.users;
    })
      .catch(error => {
        dispatch(getUsersReportAction([]));
      })

  };
}