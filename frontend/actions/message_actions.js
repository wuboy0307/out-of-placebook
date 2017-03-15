import * as APIUtil from '../util/message_api_util';

export const SEND_MESSAGE_SUCCESS = "SEND_MESSAGE_SUCCESS";
export const SEND_MESSAGE_FAILURE = "SEND_MESSAGE_FAILURE";
export const CLEAR_CURRENT_CHAT = "CLEAR_CURRENT_CHAT";

export const sendMessageSuccess = message => ({
  type: SEND_MESSAGE_SUCCESS,
  message
});
export const clearCurrentChat = () => ({
  type: CLEAR_CURRENT_CHAT
});

export const sendMessageFailure = errors => ({
  type: SEND_MESSAGE_FAILURE,
  errors
});

export const sendMessageRequest = (message) => dispatch => (
  APIUtil.sendMessage(message)
    .then(data => dispatch(sendMessageSuccess(data)),
      err => dispatch(sendMessageFailure(err.responseJSON)))
);
