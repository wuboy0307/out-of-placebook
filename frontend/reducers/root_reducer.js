import {combineReducers} from 'redux';
import auth from './auth_reducer.js';
import sessionReducer from './session_reducer';

const RootReducer = combineReducers({
  auth
});


export default RootReducer;
