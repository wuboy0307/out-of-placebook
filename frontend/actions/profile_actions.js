import * as APIUtil from '../util/profile_api_util';

export const FETCH_SINGLE_PROFILE_SUCCESS = "FETCH_SINGLE_PROFILE_SUCCESS";
export const FETCH_SINGLE_PROFILE_FAILURE = "FETCH_SINGLE_PROFILE_FAILURE";

export const PROFILE_PIC_UPLOAD_FAILURE = "PROFILE_PIC_UPLOAD_FAILURE";

export const fetchSingleProfileSuccess = profile => ({
  type: FETCH_SINGLE_PROFILE_SUCCESS,
  profile
});

export const fetchSingleProfileFailure = errors => ({
  type: FETCH_SINGLE_PROFILE_FAILURE,
  errors
});

export const profilePicUploadFailure = errors => ({
  type: PROFILE_PIC_UPLOAD_FAILURE,
  errors
});


export const fetchSingleProfileRequest = profileId => dispatch => (
  APIUtil.fetchProfile(profileId)
    .then(data => dispatch(fetchSingleProfileSuccess(data)),
      err => dispatch(fetchSingleProfileFailure(err.responseJSON)))
);

export const profilePicUploadRequest = pic => dispatch => (
  APIUtil.updateProfilePic(pic)
    .then(data => dispatch(fetchSingleProfileRequest(pic.id)),
          err => dispatch(fetchSingleProfileFailure(err.responseJSON)))
);

window.fetchSingleProfileRequest = fetchSingleProfileRequest;
