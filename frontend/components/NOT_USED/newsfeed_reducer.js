import merge from 'lodash/merge';
import { FETCH_NEWSFEED_SUCCESS } from '../actions/newsfeed_actions';

const newsfeedReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch(action.type) {
    case FETCH_NEWSFEED_SUCCESS:

      return action.posts;

    default:
      return oldState;
  }
};

export default newsfeedReducer;
