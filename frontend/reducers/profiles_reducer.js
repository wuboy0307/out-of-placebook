import merge from 'lodash/merge';
import { FETCH_SINGLE_PROFILE_SUCCESS } from '../actions/profile_actions';

const _initialState = {};

const profilesReducer = (oldState = _initialState, action) => {
  Object.freeze(oldState);
  let newState;
  switch(action.type) {
    case FETCH_SINGLE_PROFILE_SUCCESS:
      let fetchedProfile = action.profile.profile;
      // newState = merge({}, _initialState, oldState);
      // newState.profileList[fetchedProfile.id] = fetchedProfile;
      return fetchedProfile;
    default:
      return oldState;
  }
};

export default profilesReducer;
