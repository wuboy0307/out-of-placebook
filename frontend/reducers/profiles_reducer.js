import merge from 'lodash/merge';
import { FETCH_SINGLE_PROFILE_SUCCESS } from '../actions/profile_actions';

const _initialState = {
  currentProfileId: null,
  profileList: {}
};

const profilesReducer = (oldState = _initialState, action) => {
  Object.freeze(oldState);
  let newState;
  switch(action.type) {
    case FETCH_SINGLE_PROFILE_SUCCESS:
      newState = merge({}, _initialState, oldState);
      newState.profileList[action.profile.id] = action.profile;
      return newState;
    default:
      return oldState;
  }
};

export default profilesReducer;
