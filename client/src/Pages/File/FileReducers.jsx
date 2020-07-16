import {
  GET_FILES,
  GET_FILES_FAILURE,
  GET_FILES_REPORT,
  GET_FILES_SUCCESS,
  GET_USERS_REPORT
} from '../../Configs/ActionTypes'

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
      }
      break;
    case GET_FILES_SUCCESS:
      return {
        ...state,
        pending: false,
        files: action.payload
      }
      break;
    case GET_FILES_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.error
      }
    case GET_FILES_REPORT:
      if(action.payload.length > 0){
        return {
          ...state,
          pending: false,
          report: action.payload
        }
      }
    default:
      // the dispatched action is not in this reducer, return the state unchanged
      return state;
  }
}