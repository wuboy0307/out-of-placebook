import { FETCH_FRIENDS_SUCCESS, FETCH_FRIEND_COUNT_SUCCESS } from '../actions/friend_actions';
import merge from 'lodash/merge';



const friendReducer = (oldState = { notificationCount: 0 }, action) => {
  Object.freeze(action);
  let newState = merge({}, oldState);
  switch(action.type) {
    
    case FETCH_FRIENDS_SUCCESS:
      newState = merge({}, newState, action.friends);
      return newState;

    case FETCH_FRIEND_COUNT_SUCCESS:
      newState.notificationCount = action.count.count;
      return newState;

    default:
      return oldState;
  }
};

export default friendReducer;
