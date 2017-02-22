export const sendMessage = (message) => {
  return $.ajax({
    method: 'PUT',
    url: `/api/messages/${message.channelId}`,
    data: {message}
  });
};
