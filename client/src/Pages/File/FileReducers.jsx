import {GET_FILES, GET_FILES_REPORT, SET_FILES, SET_FILES_REPORT} from '../../Configs/ActionTypes'

const initialState = {
  files: [],
  report: {
    totalFileCount: 0,
    sizePerTypes: [{
      type: 'mp4',
      size: 0
    },
      {
        type: 'wav',
        size: 0
      }],
    maxFileSize: 0,
    minFileSize: 0,
    avgFileSize: 0
  }
}
export default function FileReducer(state = initialState, action) {
  switch (action.type) {
    case GET_FILES:
      return {
        ...state,
        pending: true
      };
    case SET_FILES:
      return {
        ...state,
        pending: false,
        files: action.payload
      };
    case GET_FILES_REPORT:
      return {
        ...state,
        pending: false
      };
    case SET_FILES_REPORT:
      return {
        ...state,
        pending: false,
        report: action.payload
      }
    default:
  }
  return state;
}