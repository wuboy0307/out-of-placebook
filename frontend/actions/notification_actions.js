import * as APIUtil from '../util/notification_api_util';

export const FETCH_NOTIFICATION_COUNT_SUCCESS = "FETCH_NOTIFICATION_COUNT_SUCCESS";
export const FETCH_NOTIFICATION_COUNT_FAILURE = "FETCH_NOTIFICATION_COUNT_FAILURE";
export const FETCH_NOTIFICATIONS_SUCCESS = "FETCH_NOTIFICATIONS_SUCCESS";
export const FETCH_NOTIFICATIONS_FAILURE = "FETCH_NOTIFICATIONS_FAILURE";

export const fetchNotificationCountSuccess = count => ({
  type: FETCH_NOTIFICATION_COUNT_SUCCESS,
  count
});

export const fetchNotificationCountFailure = errors => ({
  type: FETCH_NOTIFICATION_COUNT_FAILURE,
  errors
});

export const fetchNotificationsSuccess = notifications => ({
  type: FETCH_NOTIFICATIONS_SUCCESS,
  notifications
});

export const fetchNotificationsFailure = errors => ({
  type: FETCH_NOTIFICATIONS_FAILURE,
  errors
});

export const fetchNotificationCountRequest = () => dispatch => (
  APIUtil.fetchNotificationCount()
    .then(data => dispatch(fetchNotificationCountSuccess(data)),
      err => dispatch(fetchNotificationCountFailure(err.responseJSON)))
);

export const fetchNotificationsRequest = (type = { fetch: true }) => dispatch => (
  APIUtil.fetchNotifications(type)
    .then(data => dispatch(fetchNotificationsSuccess(data)),
      err => dispatch(fetchNotificationsFailure(err.responseJSON)))
);

window.fetchNotificationsRequest = fetchNotificationsRequest;
