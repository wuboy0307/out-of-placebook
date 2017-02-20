export const fetchNotificationCount = () => {
  return $.ajax({
    method: 'GET',
    url: `/api/notifications`
  });
};
