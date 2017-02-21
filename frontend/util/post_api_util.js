export const createComment = (comment) => {
  return $.ajax({
    method: 'POST',
    url: '/api/comments/',
    data: { comment }
  });
};

export const createLike = (like) => {
  return $.ajax({
    method: 'POST',
    url: '/api/likes/',
    data: { like }
  });
};

export const createPost = (post) => {
  return $.ajax({
    method: 'POST',
    url: '/api/posts/',
    data: { post }
  });
};

export const destroyLike = (like) => {
  return $.ajax({
    method: 'DELETE',
    url: '/api/likes/',
    data: { like }
  });
};

export const getPost = (postId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/posts/${postId}`
  });
};
