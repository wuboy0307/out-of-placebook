import { FETCH_SEARCH_RESULTS_SUCCESS,
         FETCH_CHAT_SEARCH_RESULTS_SUCCESS
        } from '../actions/search_actions';
import merge from 'lodash/merge';

const _initialState = {
  navbarSearch: null,
  chatbarSearch: null
}


const searchReducer = (oldState = _initialState, action) => {
  let newState = merge({}, oldState);
  Object.freeze(oldState);
  switch(action.type) {
    case FETCH_SEARCH_RESULTS_SUCCESS:
      newState.navbarSearch = action.results.search;
      return newState;

    case FETCH_CHAT_SEARCH_RESULTS_SUCCESS:
      newState.chatbarSearch = action.results.search;
      return newState;

    default:
      return oldState;
  }
};

export default searchReducer;
