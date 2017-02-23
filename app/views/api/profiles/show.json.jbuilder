user = current_user

json.profile do
  json.id @user.id
  json.fname @user.fname
  json.lname @user.lname
  json.intro @user.intro
  json.home @user.home
  json.work @user.work
  json.description @user.description
  json.friendIds @user.friend_ids
  json.avatarUrl @user.avatar.url(:profile)
  json.coverUrl @user.cover_url
  json.avatarHeader @user.avatar.url(:header)
  json.avatarXS @user.avatar.url(:xs)
  json.avatarXXS @user.avatar.url(:xxs)
  json.avatarXXXS @user.avatar.url(:xxxs)
  json.photos @user.photos.order(created_at: :desc).limit(9).each do |photo|
    json.id photo.id
    json.thumbUrl photo.image.url(:thumb)
    json.imageUrlOriginal photo.image.url
  end
end


json.set! "posts", {} if @posts.empty?

json.posts do
  @posts.each do |post|
    json.partial! "api/posts/show", post: post, user: user
  end
end
