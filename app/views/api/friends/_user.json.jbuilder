user = current_user
friends = user.friends.includes(:friends)

if friends.empty?
  json.set! "friends", {}
else
  json.friends do
    friends.each do |friend|
      json.set! friend.id do
        json.id friend.id
        json.fullName friend.full_name
        json.avatar friend.avatar.url(:xxs)
        json.avatarFriend friend.avatar.url(:friend)
        json.friendIds friend.friends.map(&:id)
      end
    end
  end
end

incoming_friends = user.incoming_friends

if incoming_friends.empty?
  json.set! "incomingFriends", {}
else
  json.incomingFriends do
    incoming_friends.each do |friend|
      json.set! friend.id do
        json.id friend.id
        json.fullName friend.full_name
        json.avatar friend.avatar.url(:xxs)
        json.friendIds friend.friends.map(&:id)
      end
    end
  end
end

outgoing_friends = user.outgoing_friends

if outgoing_friends.empty?
  json.set! "outgoingFriends", {}
else
  json.outgoingFriends do
    outgoing_friends.each do |friend|
      json.set! friend.id do
        json.id friend.id
        json.fullName friend.full_name
        json.avatar friend.avatar.url(:xxs)
        json.friendIds friend.friends.map(&:id)
      end
    end
  end
end
