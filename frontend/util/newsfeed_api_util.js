export const fetchNewsfeed = () => {
  return $.ajax({
    method: 'GET',
    url: `/api/newsfeed`
  });
};

export const getPost = (postId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/posts/${postId}`
  });
};
