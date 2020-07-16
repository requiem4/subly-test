import { combineReducers } from 'redux';
import LayoutReducer  from '../Components/Layout/LayoutReducer'
import AuthReducer from "../Pages/Auth/AuthReducer";
import UserReducer from "../Pages/User/UserReducers";
import FileReducer from "../Pages/File/FileReducers";

/**
 * Root Reducer
 * @type {Reducer<CombinedState<unknown>>}
 */
const Reducers = combineReducers({
  layout: LayoutReducer,
  auth: AuthReducer,
  user: UserReducer,
  file: FileReducer
})
export default Reducers
