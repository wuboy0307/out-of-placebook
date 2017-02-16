import * as APIUtil from '../util/profile_api_util';

export const FETCH_SINGLE_PROFILE_SUCCESS = "FETCH_SINGLE_PROFILE_SUCCESS";
export const FETCH_SINGLE_PROFILE_FAILURE = "FETCH_SINGLE_PROFILE_FAILURE";

export const fetchSingleProfileSuccess = profile => ({
  type: FETCH_SINGLE_PROFILE_SUCCESS,
  profile
});

export const fetchSingleProfileFailure = errors => ({
  type: FETCH_SINGLE_PROFILE_FAILURE,
  errors
});


export const fetchSingleProfileRequest = profileId => dispatch => (
  APIUtil.fetchProfile(profileId)
    .then(data => dispatch(fetchSingleProfileSuccess(data)),
      err => dispatch(fetchSingleProfileFailure(err.responseJSON)))
);

window.fetchSingleProfileRequest = fetchSingleProfileRequest;
