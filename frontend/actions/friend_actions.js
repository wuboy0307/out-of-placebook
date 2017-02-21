import * as APIUtil from '../util/friend_api_util';

export const FETCH_FRIENDS_SUCCESS = "FETCH_FRIENDS_SUCCESS";
export const FETCH_FRIENDS_FAILURE = "FETCH_FRIENDS_FAILURE";

export const fetchFriendsSuccess = friends => ({
  type: FETCH_FRIENDS_SUCCESS,
  friends
});

export const fetchFriendsFailure = errors => ({
  type: FETCH_FRIENDS_FAILURE,
  errors
});

export const fetchFriendsRequest = () => dispatch => (
  APIUtil.getFriends()
    .then(data => dispatch(fetchFriendsSuccess(data)),
          err => dispatch(fetchFriendsFailure(err.responseJSON)))
);

export const addFriendRequest = (friend) => dispatch => (
  APIUtil.addFriend(friend)
    .then(data => dispatch(fetchFriendsSuccess(data)),
          err => dispatch(fetchFriendsFailure(err.responseJSON)))
);

export const removeFriendRequest = (friend) => dispatch => (
  APIUtil.removeFriend(friend)
    .then(data => dispatch(fetchFriendsSuccess(data)),
          err => dispatch(fetchFriendsFailure(err.responseJSON)))
);

export const respondToFriendRequest = (friend) => dispatch => (
  APIUtil.respondToFriend(friend)
    .then(data => dispatch(fetchFriendsSuccess(data)),
          err => dispatch(fetchFriendsFailure(err.responseJSON)))
);
