export const fetchNewsfeed = () => {
  return $.ajax({
    method: 'GET',
    url: `/api/newsfeed`
  });
};
