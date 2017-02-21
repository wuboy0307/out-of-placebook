if @users.empty?
  json.set! "search", {}
else
  json.search do
    @users.each do |user|
      json.set! user.id do
        json.id user.id
        json.fullName user.full_name
        json.avatarUrl user.avatar_url
        json.mutualFriends (current_user.friend_ids & user.friend_ids).length
      end
    end
  end
end
