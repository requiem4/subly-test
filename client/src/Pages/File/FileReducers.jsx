import {GET_FILES, GET_FILES_REPORT, SET_FILES, SET_FILES_REPORT} from '../../Configs/ActionTypes'

const initialState = {
  files: [],
  report: {
    totalFileCount: 0,
    types: {
      mp4: {
        type: 'mp4',
        size: 0,
        percent: 0,
        count: 0,
        minMb: 0,
        maxMb: 0
      },
      wav: {
        type: 'wav',
        size: 0,
        percent: 0,
        count: 0,
        minMb: 0,
        maxMb: 0
      }
    },
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