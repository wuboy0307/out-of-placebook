import { FETCH_SINGLE_PROFILE_SUCCESS } from '../actions/profile_actions';

const postsReducer = ( oldState = [], action) => {
  Object.freeze(oldState);
  switch(action.type) {
    case FETCH_SINGLE_PROFILE_SUCCESS:
      return action.profile.posts;
    default:
      return oldState;
  }
};

export default postsReducer;
