import * as APIUtil from '../util/post_api_util';

export const CREATE_SINGLE_COMMENT_SUCCESS = "CREATE_SINGLE_COMMENT_SUCCESS";
export const CREATE_SINGLE_COMMENT_FAILURE = "CREATE_SINGLE_COMMENT_FAILURE";
export const CREATE_SINGLE_LIKE_SUCCESS = "CREATE_SINGLE_LIKE_SUCCESS";
export const CREATE_SINGLE_LIKE_FAILURE = "CREATE_SINGLE_LIKE_FAILURE";
export const DESTROY_SINGLE_LIKE_SUCCESS = "DESTROY_SINGLE_LIKE_SUCCESS";
export const DESTROY_SINGLE_LIKE_FAILURE = "DESTROY_SINGLE_LIKE_FAILURE";
export const CREATE_SINGLE_POST_SUCCESS = "CREATE_SINGLE_POST_SUCCESS";
export const CREATE_SINGLE_POST_FAILURE = "CREATE_SINGLE_POST_FAILURE";
export const DESTROY_SINGLE_POST_SUCCESS = "DESTROY_SINGLE_POST_SUCCESS";
export const DESTROY_SINGLE_POST_FAILURE = "DESTROY_SINGLE_POST_FAILURE";
export const EDIT_SINGLE_POST_SUCCESS = "EDIT_SINGLE_POST_SUCCESS";
export const EDIT_SINGLE_POST_FAILURE = "EDIT_SINGLE_POST_FAILURE";
export const FETCH_SINGLE_POST_FAILURE = "FETCH_SINGLE_POST_FAILURE";
export const FETCH_SINGLE_POST_SUCCESS = "FETCH_SINGLE_POST_SUCCESS";
export const FETCH_SINGLE_SHARED_POST_FAILURE = "FETCH_SINGLE_SHARED_POST_FAILURE";
export const FETCH_SINGLE_SHARED_POST_SUCCESS = "FETCH_SINGLE_SHARED_POST_SUCCESS";
export const FETCH_WALL_UPDATE_SUCCESS = "FETCH_WALL_UPDATE_SUCCESS";



export const fetchWallUpdateSucess = posts => ({
  type: FETCH_WALL_UPDATE_SUCCESS,
  posts
});

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

export const createSingleLikeFailure = errors => ({
  type: CREATE_SINGLE_LIKE_FAILURE,
  errors
});

export const createSinglePostSuccess = post => ({
  type: CREATE_SINGLE_POST_SUCCESS,
  post
});

export const createSinglePostFailure = errors => ({
  type: CREATE_SINGLE_POST_FAILURE,
  errors
});

export const editSinglePostSuccess = post => ({
  type: EDIT_SINGLE_POST_SUCCESS,
  post
});

export const editSinglePostFailure = errors => ({
  type: EDIT_SINGLE_POST_FAILURE,
  errors
});

export const destroySinglePostSuccess = post => ({
  type: DESTROY_SINGLE_POST_SUCCESS,
  post
});

export const destroySinglePostFailure = errors => ({
  type: DESTROY_SINGLE_POST_FAILURE,
  errors
});

export const fetchSinglePostSuccess = post => ({
  type: FETCH_SINGLE_POST_SUCCESS,
  post
});

export const fetchSingleSharedPostSuccess = post => ({
  type: FETCH_SINGLE_SHARED_POST_SUCCESS,
  post
});

export const fetchSinglePostFailure = errors => ({
  type: FETCH_SINGLE_POST_FAILURE,
  errors
});

export const destroySingleLikeSuccess = likeInfo => ({
  type: DESTROY_SINGLE_LIKE_SUCCESS,
  likeInfo
});

export const destroySingleLikeFailure = errors => ({
  type: DESTROY_SINGLE_LIKE_FAILURE,
  errors
});


export const destroySingleLikeRequest = likeInfo => dispatch => (
  APIUtil.destroyLike(likeInfo)
    .then(data => dispatch(destroySingleLikeSuccess(data)),
          err => console.log(err.responseJSON))
);


export const createSingleLikeRequest = likeInfo => dispatch => (
  APIUtil.createLike(likeInfo)
    .then(data => dispatch(createSingleLikeSuccess(data)),
          err => dispatch(createSingleLikeFailure(err.responseJSON)))
);

export const createSinglePostRequest = postInfo => dispatch => (
  APIUtil.createPost(postInfo)
    .then(data => dispatch(createSinglePostSuccess(data)),
          err => dispatch(createSinglePostFailure(err.responseJSON)))
);

export const editSinglePostRequest = postInfo => dispatch => (
  APIUtil.editPost(postInfo)
    .then(data => dispatch(editSinglePostSuccess(data)),
          err => dispatch(editSinglePostFailure(err.responseJSON)))
);

export const destroySinglePostRequest = postId => dispatch => (
  APIUtil.destroyPost(postId)
    .then(data => dispatch(destroySinglePostSuccess(data)),
          err => dispatch(destroySinglePostFailure(err.responseJSON)))
);

export const createSingleCommentRequest = comment => dispatch => (
  APIUtil.createComment(comment)
    .then(data => dispatch(createSingleCommentSuccess(data)),
      err => dispatch(createSingleCommentFailure(err.responseJSON)))
);

export const fetchSinglePostRequest = postId => dispatch => (
  APIUtil.getPost(postId)
    .then(data => dispatch(fetchSinglePostSuccess(data)),
      err => dispatch(fetchSinglePostFailure(err.responseJSON)))
);
export const fetchWallUpdate = postId => dispatch => (
  APIUtil.getPost(postId)
    .then(data => dispatch(fetchWallUpdateSucess(data)),
      err => dispatch(fetchSinglePostFailure(err.responseJSON)))
);

export const fetchSingleSharedPostRequest = postId => dispatch => (
  APIUtil.getPost(postId)
    .then(data => dispatch(fetchSingleSharedPostSuccess(data)),
      err => dispatch(fetchSinglePostFailure(err.responseJSON)))
);
