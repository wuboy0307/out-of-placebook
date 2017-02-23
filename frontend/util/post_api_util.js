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

export const createPost = (formData) => {
  return $.ajax({
    method: 'POST',
    url: '/api/posts/',
    contentType: false,
    processData: false,
    data: formData,
    dataType: 'json'
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

export const destroyPost = (postId) => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/posts/${postId}`
  });
};

export const editPost = (post) => {
  return $.ajax({
    method: 'PUT',
    url: `/api/posts/${post.id}`,
    data: {post}
  });
};
