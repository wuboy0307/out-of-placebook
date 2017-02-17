import * as APIUtil from '../util/post_api_util';

export const CREATE_SINGLE_COMMENT_SUCCESS = "CREATE_SINGLE_COMMENT_SUCCESS";
export const CREATE_SINGLE_COMMENT_FAILURE = "CREATE_SINGLE_COMMENT_FAILURE";

export const createSingleCommentSuccess = comment => ({
  type: CREATE_SINGLE_COMMENT_SUCCESS,
  comment
});

export const createSingleCommentFailure = errors => ({
  type: CREATE_SINGLE_COMMENT_FAILURE,
  errors
});

export const createSingleCommentRequest = comment => dispatch => (
  APIUtil.createComment(comment)
    .then(data => dispatch(createSingleCommentSuccess(data)),
      err => dispatch(createSingleCommentFailure(err.responseJSON)))
);
