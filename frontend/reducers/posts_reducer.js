import { FETCH_SINGLE_PROFILE_SUCCESS } from '../actions/profile_actions';
import { CREATE_SINGLE_COMMENT_SUCCESS,
        CREATE_SINGLE_LIKE_SUCCESS,
        DESTROY_SINGLE_LIKE_SUCCESS,
        CREATE_SINGLE_POST_SUCCESS,
        DESTROY_SINGLE_POST_SUCCESS,
        EDIT_SINGLE_POST_SUCCESS,
        FETCH_SINGLE_POST_SUCCESS } from '../actions/post_actions';
import { FETCH_NEWSFEED_SUCCESS } from '../actions/newsfeed_actions';
import merge from 'lodash/merge';

const postsReducer = ( oldState = {}, action) => {
  Object.freeze(oldState);
  let newState = merge({}, oldState);
  let likeInfo;
  switch(action.type) {
    case FETCH_SINGLE_PROFILE_SUCCESS:
      return action.profile.posts;

    case FETCH_SINGLE_POST_SUCCESS:
      return action.post.posts;

    case FETCH_NEWSFEED_SUCCESS:
      return action.posts.posts;

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

    case CREATE_SINGLE_POST_SUCCESS:
      newState[action.post.id] = action.post;
      return newState;

    case CREATE_SINGLE_LIKE_SUCCESS:
      likeInfo = action.likeInfo;
      switch(likeInfo.type) {
        case "post":
          newState[likeInfo.postId].userLikesPost = true;
          newState[likeInfo.postId].numLikes++;
          break;
        case "comment":
          if (likeInfo.parentId) {
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

    case DESTROY_SINGLE_LIKE_SUCCESS:
      likeInfo = action.likeInfo;
      switch(likeInfo.type) {
        case "post":
          newState[likeInfo.postId].userLikesPost = false;
          newState[likeInfo.postId].numLikes--;
          break;
        case "comment":
          if (likeInfo.parentId) {
            newState[likeInfo.postId].comments[likeInfo.parentId]
              .childComments[likeInfo.commentId].userLikesComment = false;
            newState[likeInfo.postId].comments[likeInfo.parentId]
              .childComments[likeInfo.commentId].numLikes--;
          } else {
            newState[likeInfo.postId].comments[likeInfo.commentId].userLikesComment = false;
            newState[likeInfo.postId].comments[likeInfo.commentId].numLikes--;
          }
          break;
      }
      return newState;

    case DESTROY_SINGLE_POST_SUCCESS:
      delete newState[action.post.postId];
      return newState;

    case EDIT_SINGLE_POST_SUCCESS:
      const post_id = Object.keys(action.post);
      newState[post_id] = action.post[post_id];
      return newState;

    default:
      return oldState;
  }
};

export default postsReducer;
