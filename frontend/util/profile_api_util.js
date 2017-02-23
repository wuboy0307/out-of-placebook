export const fetchProfile = (profileId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/profiles/${profileId}`
  });
};

export const updateProfilePic = (formData) => {
  return $.ajax({
    method: "POST",
    url: `/api/photos`,
    contentType: false,
    processData: false,
    data: formData,
    dataType: 'json'
  });
};
