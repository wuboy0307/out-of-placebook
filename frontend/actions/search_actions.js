import * as APIUtil from '../util/search_api_util';

export const FETCH_SEARCH_RESULTS_SUCCESS = "FETCH_SEARCH_RESULTS_SUCCESS";
export const FETCH_SEARCH_RESULTS_FAILURE = "FETCH_SEARCH_RESULTS_FAILURE";
export const FETCH_CHAT_SEARCH_RESULTS_SUCCESS = "FETCH_CHAT_SEARCH_RESULTS_SUCCESS";
export const FETCH_CHAT_SEARCH_RESULTS_FAILURE = "FETCH_CHAT_SEARCH_RESULTS_FAILURE";

export const fetchChatSearchResultsSuccess = results => ({
  type: FETCH_CHAT_SEARCH_RESULTS_SUCCESS,
  results
});

export const fetchChatSearchResultsFailure = errors => ({
  type: FETCH_CHAT_SEARCH_RESULTS_FAILURE,
  errors
});

export const fetchChatSearchResultsRequest = query => dispatch => (
  APIUtil.performSearch(query)
    .then(data => dispatch(fetchChatSearchResultsSuccess(data)),
      err => dispatch(fetchChatSearchResultsFailure(err.responseJSON)))
);

export const fetchSearchResultsSuccess = results => ({
  type: FETCH_SEARCH_RESULTS_SUCCESS,
  results
});

export const fetchSearchResultsFailure = errors => ({
  type: FETCH_SEARCH_RESULTS_FAILURE,
  errors
});

export const fetchSearchResultsRequest = query => dispatch => (
  APIUtil.performSearch(query)
    .then(data => dispatch(fetchSearchResultsSuccess(data)),
      err => dispatch(fetchSearchResultsFailure(err.responseJSON)))
);
