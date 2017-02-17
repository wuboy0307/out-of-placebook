import {combineReducers} from 'redux';
import auth from './auth_reducer.js';
import sessionReducer from './session_reducer';
import profile from './profiles_reducer';
import posts from './posts_reducer';
import errors from './errors_reducer';

const RootReducer = combineReducers({
  auth,
  profile,
  posts,
  errors
});


export default RootReducer;
