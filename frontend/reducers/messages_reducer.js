import merge from 'lodash/merge';
import { FETCH_MESSAGE_NOTIFICATION_COUNT_SUCCESS,
         FETCH_MESSAGES_SUCCESS } from '../actions/notification_actions';

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
      return newState;

    default:
      return oldState;
  }
};

export default messagesReducer;
