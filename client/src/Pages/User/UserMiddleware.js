import {getUsersAction, getUsersFailureAction, getUsersSuccessAction} from './UserActions'
import UserApi from "../../Api/UserApi";

function getUsers(params) {
  return (dispatch) => {
    dispatch(getUsersAction());
    UserApi.getUsers(params).then(response => {
      if (response.error) {
        throw(response.error);
      }
      dispatch(getUsersSuccessAction(response.data));
      return response.data;
    })
      .catch(error => {
        dispatch(getUsersFailureAction(error));
      })

  };
}

export default getUsers;