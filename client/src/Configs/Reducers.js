import { combineReducers } from 'redux';
import LayoutReducer  from '../Components/Layout/LayoutReducer'
import AuthReducer from "../Pages/Auth/AuthReducer";

/**
 * Root Reducer
 * @type {Reducer<CombinedState<unknown>>}
 */
const Reducers = combineReducers({
  layout: LayoutReducer,
  auth: AuthReducer,
})
export default Reducers
