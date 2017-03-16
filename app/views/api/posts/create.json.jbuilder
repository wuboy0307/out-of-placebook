post = @post
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
  json.coverUrl @user.cover.url(:cover)
  json.avatarHeader @user.avatar.url(:header)
  json.avatarXS @user.avatar.url(:xs)
  json.avatarXXS @user.avatar.url(:xxs)
  json.avatarXXXS @user.avatar.url(:xxxs)
  json.photos @user.photos.order(created_at: :desc).limit(9).each do |photo|
    json.id photo.id
    json.thumbUrl photo.image.url(:thumb)
    json.photoUrl photo.image.url(:photo)
    json.imageUrlOriginal photo.image.url
  end
  json.friends @user.friends.order('friendships.updated_at desc').limit(9).each do |friend|
    json.id friend.id
    json.thumbUrl friend.avatar.url(:friend)
    json.avatarUrlOriginal friend.avatar.url
    json.fullName friend.full_name
  end
end

json.post do
  json.id post.id
  json.wallId post.wall_id
  json.authorId post.author_id
  json.authorFullName post.author.full_name
  json.authorAvatarUrl post.author.avatar.url(:xs)
  json.createdAt post.age
  json.body post.body
  json.wallIdFullName post.wall.full_name
  json.parentID post.parent_id
  if post.content.class.name.downcase === "url"
    json.content do
      json.extract! post.content, :url, :title, :description, :domain_name, :image
    end
  elsif post.content.class.name.downcase === "post"
    json.content do
      json.partial! 'api/posts/post_in_post', post: post.content, user: user
    end
  elsif post.content.class.name.downcase === "photo"
    json.content do
      json.id post.content.id
      json.imageUrlTimeline post.content.image.url(:timeline)
      json.imageUrlOriginal post.content.image.url
      json.authorId post.content.author.id
    end
  else
    json.set! "content", {}
  end
  json.contentType post.content.class.name.downcase
  json.numLikes post.likes.length
  json.likeText post.like_preview_text(user)
  json.userLikesPost post.user_likes?(user)
end
