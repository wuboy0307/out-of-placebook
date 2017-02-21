if @users.empty?
  json.set! "search", {}
else
  json.search do
    @users.each do |user|
      json.set! user.id do
        json.id user.id
        json.fullName user.full_name
        json.avatarUrl user.avatar_url
        json.mutualFriends (user.friends & current_user.friends).length
      end
    end
  end
end
