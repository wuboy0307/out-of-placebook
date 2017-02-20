export const fetchNotificationCount = () => {
  return $.ajax({
    method: 'GET',
    url: `/api/notifications`
  });
};

export const fetchNotifications = (notifications) => {
  return $.ajax({
    method: 'POST',
    url: `/api/notifications`,
    data: { notifications }
  });
};
