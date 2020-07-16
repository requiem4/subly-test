import {getFilesAction, getFilesFailureAction, getFilesReportAction, getFilesSuccessAction} from './FileActions'
import FileApi from "../../Api/FileApi";

export function getFiles(params = []) {
  return (dispatch) => {
    dispatch(getFilesAction());
    FileApi.getFiles(params).then(response => {
      if (response.error) {
        throw(response.error);
      }
      dispatch(getFilesSuccessAction(response.users));
      return response.users;
    })
      .catch(error => {
        dispatch(getFilesFailureAction(error));
      })

  };
}

export function uploadFiles(files) {
  return (dispatch) => {
    dispatch(getFilesAction());
    FileApi.uploadFiles(files).then(response => {
      if (response.error) {
        throw(response.error);
      }
      dispatch(getFilesSuccessAction(response.users));
      return response.users;
    })
      .catch(error => {
        dispatch(getFilesFailureAction(error));
      })

  };
}

export function getFilesReport(params = []) {
  return (dispatch) => {
    dispatch(getFilesReportAction([]));
    FileApi.getFilesReport(params).then(response => {
      if (response.error) {
        throw(response.error);
      }
      dispatch(getFilesReportAction(response.report));
      return response.users;
    })
      .catch(error => {
        dispatch(getFilesReportAction(error));
      })
  };
}

/*
export const {UPLOAD_FILE_Action, loginActionTypes, loginReducer} = reduxHelper('uploadFile',
  function (params) {
    return FileApi.getFiles(params)
  })
*/

//export default getFiles;