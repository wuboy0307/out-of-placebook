import * as APIUtil from '../util/notification_api_util';

export const FETCH_NOTIFICATION_COUNT_SUCCESS = "FETCH_NOTIFICATION_COUNT_SUCCESS";
export const FETCH_NOTIFICATION_COUNT_FAILURE = "FETCH_NOTIFICATION_COUNT_FAILURE";
export const FETCH_MESSAGE_NOTIFICATION_COUNT_SUCCESS = "FETCH_MESSAGE_NOTIFICATION_COUNT_SUCCESS";
export const FETCH_MESSAGE_NOTIFICATION_COUNT_FAILURE = "FETCH_MESSAGE_NOTIFICATION_COUNT_FAILURE";
export const FETCH_NOTIFICATIONS_SUCCESS = "FETCH_NOTIFICATIONS_SUCCESS";
export const FETCH_NOTIFICATIONS_FAILURE = "FETCH_NOTIFICATIONS_FAILURE";
export const FETCH_MESSAGES_SUCCESS = "FETCH_MESSAGES_SUCCESS";
export const FETCH_MESSAGES_FAILURE = "FETCH_MESSAGES_FAILURE";

export const fetchMessagesSuccess = messages => ({
  type: FETCH_MESSAGES_SUCCESS,
  messages
});

export const fetchMessagesFailure = errors => ({
  type: FETCH_MESSAGES_FAILURE,
  errors
});

export const fetchNotificationCountSuccess = count => ({
  type: FETCH_NOTIFICATION_COUNT_SUCCESS,
  count
});

export const fetchNotificationCountFailure = errors => ({
  type: FETCH_NOTIFICATION_COUNT_FAILURE,
  errors
});

export const fetchMessageNotificationCountSuccess = count => ({
  type: FETCH_MESSAGE_NOTIFICATION_COUNT_SUCCESS,
  count
});

export const fetchMessageNotificationCountFailure = errors => ({
  type: FETCH_MESSAGE_NOTIFICATION_COUNT_FAILURE,
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

export const fetchMessagesRequest = () => dispatch => (
  APIUtil.fetchMessages()
    .then(data => dispatch(fetchMessagesSuccess(data)),
      err => dispatch(fetchMessagesFailure(err.responseJSON)))
);

export const fetchMessageNotificationCountRequest = () => dispatch => (
  APIUtil.fetchMessageNotificationCount()
    .then(data => dispatch(fetchMessageNotificationCountSuccess(data)),
      err => dispatch(fetchMessageNotificationCountFailure(err.responseJSON)))
);

export const fetchNotificationsRequest = (type = { fetch: true }) => dispatch => (
  APIUtil.fetchNotifications(type)
    .then(data => dispatch(fetchNotificationsSuccess(data)),
      err => dispatch(fetchNotificationsFailure(err.responseJSON)))
);

window.fetchNotificationsRequest = fetchNotificationsRequest;
