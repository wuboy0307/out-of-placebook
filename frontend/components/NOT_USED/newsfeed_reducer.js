import merge from 'lodash/merge';
import { FETCH_NEWSFEED_SUCCESS, FETCH_NEWSFEED_UPDATE_SUCCESS } from '../actions/newsfeed_actions';

const newsfeedReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState = merge({}, oldState);
  switch(action.type) {

    case FETCH_NEWSFEED_SUCCESS:
      return action.posts;

    case FETCH_NEWSFEED_UPDATE_SUCCESS:
      let posts = action.posts.posts;
      let key = parseInt(Object.keys(posts)[0]);
      let post = posts[key];
      newState[key] = post;
      return newState;

    default:
      return oldState;
  }
};

export default newsfeedReducer;
