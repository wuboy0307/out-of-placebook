import { CREATE_SINGLE_POST_FAILURE } from '../actions/post_actions';
import merge from 'lodash/merge';

const _initialState = {};

const errorsReducer = (oldState = _initialState, action) => {
  Object.freeze(oldState);
  switch(action.type) {
    case CREATE_SINGLE_POST_FAILURE:
      return merge({}, oldState, action.errors);

    default:
      return {};
  }
};

export default errorsReducer;
