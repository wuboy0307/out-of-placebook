import { FETCH_FRIENDS_SUCCESS } from '../actions/friend_actions';
import merge from 'lodash/merge';

const friendReducer = (oldState = {}, action) => {
  Object.freeze(action);
  switch(action.type) {
    case FETCH_FRIENDS_SUCCESS:
      return action.friends;
    default:
      return oldState;
  }
};

export default friendReducer;
