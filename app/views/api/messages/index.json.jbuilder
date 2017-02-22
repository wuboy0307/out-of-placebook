json.numUnseenChats 0

json.chats @channels.each do |channel|
  json.channelId channel.id
  json.lastMessage channel.messages.last.body
  json.lastMessageTime channel.messages.last.created_at
  json.lastMessageFullName channel.messages.last.sender.full_name
  json.numUnseenMessages ChannelSub.find_by(participant_id: current_user.id,
            channel_id: channel.id).num_unseen
end
