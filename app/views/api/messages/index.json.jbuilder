json.numUnseenChats 0

json.chats @channels.each do |channel|
  json.channelId channel.id
  if channel.participants.length > 2
    json.channelText channel.channel_description
  else
    json.channelText channel.participants.where.not(id: current_user).first.full_name
  end
  json.lastMessage channel.messages.last.body
  json.lastMessageTime channel.messages.last.age
  json.lastMessageFullName channel.messages.last.sender.full_name
  json.numUnseenMessages ChannelSub.find_by(participant_id: current_user.id,
            channel_id: channel.id).num_unseen
end
