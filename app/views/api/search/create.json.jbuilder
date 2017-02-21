if @users.empty?
  json.set! "search", {}
else
  json.search do
    @users.each do |user|
      json.set! user.id do
        json.id user.id
        json.fullName user.full_name
        json.avatarUrl user.avatar_url
        json.friendIds user.friend_ids
      end
    end
  end
end
