import {
  deleteFilesAction,
  getFilesAction,
  getFilesReportAction,
  setFilesAction, setFilesReportAction,
  uploadFilesAction,
  uploadFilesErrorAction,
  uploadFilesSuccessAction
} from './FileActions'
import FileApi from "../../Api/FileApi";

export function getFiles(params = []) {
  return (dispatch) => {
    dispatch(getFilesAction());
    FileApi.getFiles(params)
      .then(response => {
        if (response.error) {
          throw(response.error);
        }
        if(response && response.data && response.data.files){
          dispatch(setFilesAction(response.data.files));
        }
        return response.data;
      })
  };
}
export function deleteFiles(params = {}) {
  return (dispatch) => {
    dispatch(deleteFilesAction());
    return FileApi.deleteFiles(params)
      .then(response => {
        if (response.error) {
          throw(response.error);
        }
        dispatch(getFiles)
        /*if(response && response.data && response.data.files){
          dispatch(setFilesAction(response.data.files));
        }*/
        return response.data;
      })
  };
}

export function uploadFiles(files) {
  return (dispatch) => {
    dispatch(uploadFilesAction());
    FileApi.uploadFiles(files)
      .then(response => {
        if (response.error) {
          throw(response.error);
        }
        dispatch(getFiles)
        if(response.data.files){
          dispatch(uploadFilesSuccessAction(response.data.files));
        }
        return response.data;
      }).catch(error => {
      dispatch(uploadFilesErrorAction(error));
    })
  };
}

export function getFilesReport(params = []) {
  return (dispatch) => {
    dispatch(getFilesReportAction());
    FileApi.getFilesReport(params)
      .then(response => {
        debugger
        if (response.error) {
          throw(response.error);
        }
        dispatch(setFilesReportAction(response.data.report));
        return response.data;
      })
  };
}