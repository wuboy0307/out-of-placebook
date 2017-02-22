import {combineReducers} from 'redux';
import auth from './auth_reducer.js';
import sessionReducer from './session_reducer';
import profile from './profiles_reducer';
import posts from './posts_reducer';
import errors from './errors_reducer';
import notifications from './notifications_reducer';
import friends from './friends_reducer';
import search from './search_reducer';
import messages from './messages_reducer';
// import newsfeed from './newsfeed_reducer';
// newsfeed not used, merged in to posts reducer

const RootReducer = combineReducers({
  auth,
  profile,
  posts,
  errors,
  notifications,
  friends,
  search,
  messages
});


export default RootReducer;
