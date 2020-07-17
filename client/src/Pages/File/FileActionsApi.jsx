import {
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
        dispatch(setFilesAction(response.data.files));
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
        dispatch(uploadFilesSuccessAction(response.data.files));
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
        if (response.error) {
          throw(response.error);
        }
        dispatch(setFilesReportAction(response.data.report));
        return response.data;
      })
  };
}