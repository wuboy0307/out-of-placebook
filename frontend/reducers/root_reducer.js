import {combineReducers} from 'redux';
import auth from './auth_reducer.js';
import sessionReducer from './session_reducer';
import profiles from './profiles_reducer';

const RootReducer = combineReducers({
  auth,
  profiles
});


export default RootReducer;
