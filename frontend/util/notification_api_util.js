export const fetchNotificationCount = () => {
  return $.ajax({
    method: 'GET',
    url: `/api/notifications`
  });
};

export const fetchMessageNotificationCount = () => {
  return $.ajax({
    method: 'GET',
    url: `/api/messages/count`
  });
};

export const fetchMessages = () => {
  return $.ajax({
    method: 'GET',
    url: `/api/messages`
  });
};

export const fetchChat = (channelId) => {
  return $.ajax({
    method: 'GET',
    url: `/api/messages/${channelId}`
  });
};

export const fetchNotifications = (notifications) => {
  return $.ajax({
    method: 'POST',
    url: `/api/notifications`,
    data: { notifications }
  });
};
