post = @post
user = current_user

json.id post.id
json.wallId post.wall_id
json.authorId post.author_id
json.authorFullName post.author.full_name
json.authorAvatarUrl post.author.avatar.url(:xs)
json.createdAt post.age
json.body post.body
json.wallIdFullName post.wall.full_name
json.parentID post.parent_id
json.content post.content
json.contentType post.content.class.name.downcase
json.numLikes post.likes.length
json.likeText post.like_preview_text(user)
json.userLikesPost post.user_likes?(user)
