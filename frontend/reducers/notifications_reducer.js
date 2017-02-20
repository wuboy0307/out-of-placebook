import merge from 'lodash/merge';
import { FETCH_NOTIFICATION_COUNT_SUCCESS, FETCH_NOTIFICATIONS_SUCCESS } from '../actions/notification_actions';

const _initialState = {
  count: 0,
  list: []
};

const notificationsReducer = (oldState = _initialState, action) => {
  Object.freeze(oldState);
  let newState;
  switch(action.type) {
    case FETCH_NOTIFICATION_COUNT_SUCCESS:
      newState = merge({}, oldState);
      newState.count = action.count.notification_count;
      return newState;

    case FETCH_NOTIFICATIONS_SUCCESS:
      newState = merge({},oldState);
      newState.count = 0;
      newState.list = action.notifications;
      return newState;

    default:
      return oldState;


  }
};

export default notificationsReducer;
