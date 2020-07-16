import {GET_FILES, GET_FILES_FAILURE, GET_FILES_REPORT, GET_FILES_SUCCESS} from "../../Configs/ActionTypes";

export function getFilesAction() {
  return {
    type: GET_FILES
  };
}

export function getFilesSuccessAction(data) {
  return {
    type: GET_FILES_SUCCESS,
    payload: data
  };
}

export function getFilesFailureAction(data) {
  return {
    type: GET_FILES_FAILURE,
    error: data
  };
}

export function uploadFilesAction() {
  return {
    type: GET_FILES
  };
}

export function uploadFilesSuccessAction(data) {
  return {
    type: GET_FILES_SUCCESS,
    payload: data
  };
}

export function uploadFilesFailureAction(data) {
  return {
    type: GET_FILES_FAILURE,
    error: data
  };
}

export function getFilesReportAction(data) {
  return {
    type: GET_FILES_REPORT,
    payload: data
  };
}