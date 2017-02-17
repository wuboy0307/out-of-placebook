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
