import * as APIUtil from '../util/newsfeed_api_util';

export const FETCH_NEWSFEED_SUCCESS = "FETCH_NEWSFEED_SUCCESS";
export const FETCH_NEWSFEED_FAILURE = "FETCH_NEWSFEED_FAILURE";

export const fetchNewsfeedSuccess = posts => ({
  type: FETCH_NEWSFEED_SUCCESS,
  posts
});

export const fetchNewsfeedFailure = posts => ({
  type: FETCH_NEWSFEED_FAILURE,
  posts
});

export const fetchNewsfeedRequest = () => dispatch => (
  APIUtil.fetchNewsfeed()
    .then(data => dispatch(fetchNewsfeedSuccess(data)),
          err => dispatch(fetchNewsfeedFailure(err.responseJSON)))
);
