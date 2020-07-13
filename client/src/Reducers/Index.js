import { combineReducers } from 'redux';
import LayoutReducer  from './LayoutReducer'
import AuthReducer from "./AuthReducer/AuthReducer";

export const reducers = combineReducers({
  layout: LayoutReducer,
  auth: AuthReducer,
})
