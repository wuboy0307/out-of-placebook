export const fetchProfile = (profileId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/profiles/${profileId}`
  });
};
