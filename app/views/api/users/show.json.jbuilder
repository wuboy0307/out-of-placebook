json.partial! "api/users/user", user: @user
json.friends do
  json.partial! "api/friends/user"
end
