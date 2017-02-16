json.profile do
  json.id @user.id
  json.fname @user.fname
  json.lname @user.lname
  json.intro @user.intro
  json.home @user.home
  json.work @user.work
  json.description @user.description
  json.friendIds @user.friend_ids
end

json.posts @posts.each do |post|
  json.id post.id
  json.wallId post.wall_id
  json.authorId post.author_id
  json.authorFullName post.author.full_name
  json.createdAt post.created_at
  json.body post.body
  json.parentID post.parent_id
  json.content post.content
  json.comments post.comments do |comment|
    json.id comment.id
    json.authorId
  end
end
