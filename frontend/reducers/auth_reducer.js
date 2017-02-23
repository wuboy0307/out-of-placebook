import {
  RECEIVE_CURRENT_USER,
  LOGOUT,
  RECEIVE_ERRORS,
  LOG_IN_FAILURE,
  SIGN_UP_FAILURE } from '../actions/session_actions';
import { FETCH_SINGLE_PROFILE_SUCCESS } from '../actions/profile_actions';
import merge from 'lodash/merge';

const _nullUser = Object.freeze({
  currentUser: null,
  errors: {
    signUpFormErrors: {
      fname: [],
      lname: [],
      email: [],
      password_digest: []
    },
    logInFormErrors: []
  }
});

const authReducer = (state = _nullUser, action) => {
  Object.freeze(state);
  let newState;
  switch(action.type) {

    case RECEIVE_CURRENT_USER:
      const currentUser = action.currentUser;
      return merge({}, _nullUser, {
        currentUser
      });

    case LOGOUT:
      return merge({}, _nullUser);

    case SIGN_UP_FAILURE:
      newState = merge({}, _nullUser);
      newState.errors.signUpFormErrors = action.errors;
      return newState;

    case LOG_IN_FAILURE:
      newState = merge({}, _nullUser);
      newState.errors.logInFormErrors = action.errors;
      return newState;

    case FETCH_SINGLE_PROFILE_SUCCESS:
      newState = merge({}, state);
      if (state.currentUser.id == action.profile.profile.id) {
        newState.currentUser.avatarHeader = action.profile.profile.avatarHeader;
        newState.currentUser.avatarXS = action.profile.profile.avatarXS;
        newState.currentUser.avatarXXS = action.profile.profile.avatarXXS;
        newState.currentUser.avatarXXXS = action.profile.profile.avatarXXXS;
      }
      return newState;

    default:
      return state;
  }
};

export default authReducer;
