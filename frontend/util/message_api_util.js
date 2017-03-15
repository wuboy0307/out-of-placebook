export const sendMessage = (message) => {
  return $.ajax({
    method: 'PUT',
    url: `/api/messages/${message.channelId}`,
    data: {message}
  });
};

export const addUser = (channel) => {
  return $.ajax({
    method: 'POST',
    url: `/api/messages/add_user`,
    data: {channel}
  });
};
