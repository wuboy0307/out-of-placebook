import * as APIUtil from '../util/newsfeed_api_util';

export const FETCH_NEWSFEED_SUCCESS = "FETCH_NEWSFEED_SUCCESS";
export const FETCH_NEWSFEED_FAILURE = "FETCH_NEWSFEED_FAILURE";
export const FETCH_NEWSFEED_UPDATE_SUCCESS = "FETCH_NEWSFEED_UPDATE_SUCCESS";

export const fetchNewsfeedSuccess = posts => ({
  type: FETCH_NEWSFEED_SUCCESS,
  posts
});
export const fetchNewsfeedUpdateSuccess = posts => ({
  type: FETCH_NEWSFEED_UPDATE_SUCCESS,
  posts
});

export const fetchNewsfeedFailure = errors => ({
  type: FETCH_NEWSFEED_FAILURE,
  errors
});

export const fetchNewsfeedRequest = () => dispatch => (
  APIUtil.fetchNewsfeed()
    .then(data => dispatch(fetchNewsfeedSuccess(data)),
          err => dispatch(fetchNewsfeedFailure(err.responseJSON)))
);

export const fetchNewsfeedUpdateRequest = postId => dispatch => (
  APIUtil.getPost(postId)
    .then(data => dispatch(fetchNewsfeedUpdateSuccess(data)),
      err => dispatch(fetchNewsfeedFailure(err.responseJSON)))
);
