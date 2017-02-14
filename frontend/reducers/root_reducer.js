import {combineReducers} from 'redux';
import auth from './auth_reducer.js';

const RootReducer = combineReducers({
  auth
});


export default RootReducer;
