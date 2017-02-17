import { FETCH_SINGLE_PROFILE_SUCCESS } from '../actions/profile_actions';
import { CREATE_SINGLE_COMMENT_SUCCESS } from '../actions/post_actions';
import merge from 'lodash/merge';

const postsReducer = ( oldState = [], action) => {
  Object.freeze(oldState);
  switch(action.type) {
    case FETCH_SINGLE_PROFILE_SUCCESS:
      return action.profile.posts;
    case CREATE_SINGLE_COMMENT_SUCCESS:
      let newComment = action.comment;
      let newState = merge({}, oldState);
      let oldComments = newState[newComment.postId].comments;
      if (!newComment.parentId) {
        newState[newComment.postId].comments = merge({}, oldComments);
        newState[newComment.postId].comments[newComment.id] = newComment;
      } else {
        let childComments = oldComments[newComment.parentId].childComments;
        childComments = merge({}, childComments);
        childComments[newComment.id] = newComment;
        newState[newComment.postId].comments[newComment.parentId].childComments = childComments;
      }
      return newState;
    default:
      return oldState;
  }
};

export default postsReducer;
