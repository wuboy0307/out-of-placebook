json.array! @messages.each do |message|
  json.body message.body
  json.timestamp message.created_at
  json.authorAvatar message.sender.avatar_url
  json.senderFirstName message.sender.fname
end
