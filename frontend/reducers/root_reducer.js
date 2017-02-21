import {combineReducers} from 'redux';
import auth from './auth_reducer.js';
import sessionReducer from './session_reducer';
import profile from './profiles_reducer';
import posts from './posts_reducer';
import errors from './errors_reducer';
import notifications from './notifications_reducer';
import newsfeed from './newsfeed_reducer';
// newsfeed not used, merged in to posts reducer

const RootReducer = combineReducers({
  auth,
  profile,
  posts,
  errors,
  notifications
});


export default RootReducer;
