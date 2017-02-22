import merge from 'lodash/merge';
import { FETCH_MESSAGE_NOTIFICATION_COUNT_SUCCESS,
         FETCH_MESSAGES_SUCCESS, FETCH_CHAT_SUCCESS } from '../actions/notification_actions';
import { SEND_MESSAGE_SUCCESS } from '../actions/message_actions';

const _initialState = {
  numUnseenChats: null,
  chats: [],
  currentChat: []
};

const messagesReducer = (oldState = _initialState, action) => {
  Object.freeze(oldState);
  let newState = merge({}, oldState);
  switch(action.type){
    case FETCH_MESSAGE_NOTIFICATION_COUNT_SUCCESS:
      // debugger
      newState.numUnseenChats = action.count.count;
      return newState;

    case FETCH_MESSAGES_SUCCESS:
      newState.chats = action.messages.chats;
      newState.numUnseenChats = 0;
      return newState;

    case FETCH_CHAT_SUCCESS:
      newState.currentChat = action.chat;
      newState.currentChat.messages = action.chat.messages.reverse();
      return newState;

    case SEND_MESSAGE_SUCCESS:
      newState.currentChat.messages.push(action.message);
      return newState;

    default:
      return oldState;
  }
};

export default messagesReducer;
