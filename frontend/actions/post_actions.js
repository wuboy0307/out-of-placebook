import * as APIUtil from '../util/post_api_util';

export const CREATE_SINGLE_COMMENT_SUCCESS = "CREATE_SINGLE_COMMENT_SUCCESS";
export const CREATE_SINGLE_COMMENT_FAILURE = "CREATE_SINGLE_COMMENT_FAILURE";
export const CREATE_SINGLE_LIKE_SUCCESS = "CREATE_SINGLE_LIKE_SUCCESS";
export const CREATE_SINGLE_LIKE_FAILURE = "CREATE_SINGLE_LIKE_FAILURE";
export const DESTROY_SINGLE_LIKE_SUCCESS = "DESTROY_SINGLE_LIKE_SUCCESS";
export const DESTROY_SINGLE_LIKE_FAILURE = "DESTROY_SINGLE_LIKE_FAILURE";

export const createSingleCommentSuccess = comment => ({
  type: CREATE_SINGLE_COMMENT_SUCCESS,
  comment
});

export const createSingleCommentFailure = errors => ({
  type: CREATE_SINGLE_COMMENT_FAILURE,
  errors
});

export const createSingleLikeSuccess = likeInfo => ({
  type: CREATE_SINGLE_LIKE_SUCCESS,
  likeInfo
});

export const createSingleLikeFalure = errors => ({
  type: CREATE_SINGLE_LIKE_FAILURE,
  errors
});

export const destroySingleLikeSuccess = likeInfo => ({
  type: DESTROY_SINGLE_LIKE_SUCCESS,
  likeInfo
});

export const destroySingleLikeFalure = errors => ({
  type: DESTROY_SINGLE_LIKE_FAILURE,
  errors
});


export const destroySingleLikeRequest = likeInfo => dispatch => (
  APIUtil.destroyLike(likeInfo)
    .then(data => dispatch(destroySingleLikeSuccess(data)),
          err => dispatch(destroySingleLikeFailure(err.responseJSON)))
);


export const createSingleLikeRequest = likeInfo => dispatch => (
  APIUtil.createLike(likeInfo)
    .then(data => dispatch(createSingleLikeSuccess(data)),
          err => dispatch(createSingleLikeFailure(err.responseJSON)))
);

export const createSingleCommentRequest = comment => dispatch => (
  APIUtil.createComment(comment)
    .then(data => dispatch(createSingleCommentSuccess(data)),
      err => dispatch(createSingleCommentFailure(err.responseJSON)))
);
