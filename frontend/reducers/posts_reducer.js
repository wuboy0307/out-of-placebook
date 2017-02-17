import { FETCH_SINGLE_PROFILE_SUCCESS } from '../actions/profile_actions';
import { CREATE_SINGLE_COMMENT_SUCCESS,
        CREATE_SINGLE_LIKE_SUCCESS } from '../actions/post_actions';
import merge from 'lodash/merge';

const postsReducer = ( oldState = {}, action) => {
  Object.freeze(oldState);
  let newState = merge({}, oldState);
  switch(action.type) {
    case FETCH_SINGLE_PROFILE_SUCCESS:
      return action.profile.posts;

    case CREATE_SINGLE_COMMENT_SUCCESS:
      let newComment = action.comment;
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

    case CREATE_SINGLE_LIKE_SUCCESS:
      let likeInfo = action.likeInfo;
      switch(likeInfo.type) {
        case "post":
          newState[likeInfo.postId].userLikesPost = true;
          newState[likeInfo.postId].numLikes++;
          break;
        case "comment":
          if (likeInfo.parent_id) {
            newState[likeInfo.postId].comments[likeInfo.parentId]
              .childComments[likeInfo.commentId].userLikesComment = true;
            newState[likeInfo.postId].comments[likeInfo.parentId]
              .childComments[likeInfo.commentId].numLikes++;
          } else {
            newState[likeInfo.postId].comments[likeInfo.commentId].userLikesComment = true;
            newState[likeInfo.postId].comments[likeInfo.commentId].numLikes++;
          }
          break;
      }
      return newState;

    default:
      return oldState;
  }
};

export default postsReducer;
