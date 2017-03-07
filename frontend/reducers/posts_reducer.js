import { FETCH_SINGLE_PROFILE_SUCCESS } from '../actions/profile_actions';
import { CREATE_SINGLE_COMMENT_SUCCESS,
        CREATE_SINGLE_LIKE_SUCCESS,
        DESTROY_SINGLE_LIKE_SUCCESS,
        CREATE_SINGLE_POST_SUCCESS,
        DESTROY_SINGLE_POST_SUCCESS,
        EDIT_SINGLE_POST_SUCCESS,
        FETCH_SINGLE_POST_SUCCESS,
        FETCH_SINGLE_SHARED_POST_SUCCESS,
        FETCH_WALL_UPDATE_SUCCESS,
        DELETE_POST_UPDATE_SUCCESS } from '../actions/post_actions';
import { FETCH_NEWSFEED_SUCCESS, FETCH_NEWSFEED_UPDATE_SUCCESS } from '../actions/newsfeed_actions';
import merge from 'lodash/merge';

const _initialState = { sharedPosts: {} };

const postsReducer = ( oldState = _initialState, action) => {
  Object.freeze(oldState);
  let newState = merge({}, _initialState, oldState);
  let likeInfo;
  switch(action.type) {
    case FETCH_SINGLE_PROFILE_SUCCESS:
      return merge({}, _initialState, action.profile.posts);

    case FETCH_SINGLE_POST_SUCCESS:
      return merge({}, _initialState, action.post.posts);

    case DELETE_POST_UPDATE_SUCCESS:
      delete newState[action.postId];
      return newState;

    case FETCH_NEWSFEED_UPDATE_SUCCESS:
    case FETCH_WALL_UPDATE_SUCCESS:
      let posts = action.posts.posts;
      let key = parseInt(Object.keys(posts)[0]);
      let post = posts[key];
      newState[key] = post;
      return newState;

    case FETCH_NEWSFEED_SUCCESS:
      return merge({}, _initialState, action.posts.posts);

    case FETCH_SINGLE_SHARED_POST_SUCCESS:
      newState.sharedPosts = merge({}, newState.sharedPosts, action.post.posts);
      return newState;

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
      newState[action.post.post.id] = action.post.post;
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
