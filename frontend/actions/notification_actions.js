import * as APIUtil from '../util/notification_api_util';

export const FETCH_NOTIFICATION_COUNT_SUCCESS = "FETCH_NOTIFICATION_COUNT_SUCCESS";
export const FETCH_NOTIFICATION_COUNT_FAILURE = "FETCH_NOTIFICATION_COUNT_FAILURE";

export const fetchNotificationCountSuccess = count => ({
  type: FETCH_NOTIFICATION_COUNT_SUCCESS,
  count
});

export const fetchNotificationCountFailure = errors => ({
  type: FETCH_NOTIFICATION_COUNT_FAILURE,
  errors
});

export const fetchNotificationCountRequest = () => dispatch => (
  APIUtil.fetchNotificationCount()
    .then(data => dispatch(fetchNotificationCountSuccess(data)),
      err => dispatch(fetchNotificationCountFailure(err.responseJSON)))
);
