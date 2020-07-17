import {
  GET_FILES,
  GET_FILES_REPORT, SET_FILES, SET_FILES_REPORT,
  UPLOAD_FILES,
  UPLOAD_FILES_ERROR,
  UPLOAD_FILES_SUCCESS
} from "../../Configs/ActionTypes";

export function getFilesAction() {
  return {
    type: GET_FILES
  };
}

export function setFilesAction(data) {
  return {
    type: SET_FILES,
    payload: data
  };
}

export function getFilesReportAction() {
  return {
    type: GET_FILES_REPORT,
    payload: {}
  };
}

export function setFilesReportAction(data) {
  return {
    type: SET_FILES_REPORT,
    payload: data
  };
}

export function uploadFilesAction() {
  return {
    type: UPLOAD_FILES
  };
}

export function uploadFilesSuccessAction(data) {
  return {
    type: UPLOAD_FILES_SUCCESS,
    payload: data
  };
}

export function uploadFilesErrorAction(data) {
  return {
    type: UPLOAD_FILES_ERROR,
    error: data
  };
}