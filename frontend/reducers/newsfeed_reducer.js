import { FETCH_NEWSFEED_SUCCESS,
        FETCH_NEWSFEED_UPDATE_SUCCESS } from '../actions/newsfeed_actions';
import { EDIT_SINGLE_POST_SUCCESS,
        DELETE_POST_UPDATE_SUCCESS } from '../actions/post_actions';

import merge from 'lodash/merge';

const _initialState = { sharedPosts: {} };

const newsfeedReducer = ( oldState = _initialState, action) => {
  Object.freeze(oldState);
  let newState = merge({}, _initialState, oldState);
  let likeInfo;
  switch(action.type) {
    case FETCH_NEWSFEED_UPDATE_SUCCESS:
      let posts = action.posts.posts;
      let key = parseInt(Object.keys(posts)[0]);
      let post = posts[key];
      newState[key] = post;
      return newState;

    case FETCH_NEWSFEED_SUCCESS:
      return merge({}, _initialState, action.posts.posts);

    case EDIT_SINGLE_POST_SUCCESS:
      const post_id = Object.keys(action.post);
      if (!newState[post_id]) return newState;

      newState[post_id] = action.post[post_id];
      return newState;

    case DELETE_POST_UPDATE_SUCCESS:
      if (!newState[action.postId]) return newState;
      delete newState[action.postId];
      return newState;

    // case CREATE_SINGLE_POST_SUCCESS:
    //   if (!newState[action.post.post.id]) return newState;
    //   newState[action.post.post.id] = action.post.post;
    //   return newState;

    default:
      return oldState;
  }

}

export default newsfeedReducer;
