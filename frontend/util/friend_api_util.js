export const addFriend = (friend) => {
  return $.ajax({
    method: 'POST',
    url: '/api/friends/',
    data: { friend }
  });
};

export const removeFriend = (friend) => {
  return $.ajax({
    method: 'DELETE',
    url: '/api/friends/',
    data: { friend }
  });
};

export const respondToFriend = (friend) => {
  return $.ajax({
    method: 'PUT',
    url: '/api/friends/',
    data: { friend }
  });
};

export const getFriends = () => {
  return $.ajax({
    method: 'GET',
    url: '/api/friends/'
  });
};
