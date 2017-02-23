json.id post.id
json.wallId post.wall_id
json.authorId post.author_id
json.authorFullName post.author.full_name
json.authorAvatarUrl post.author.avatar.url(:xs)
json.createdAt post.age
json.body post.body
json.wallIdFullName post.wall.full_name
json.parentID post.parent_id
json.contentType post.content.class.name.downcase
if post.content.class.name.downcase === "url"
  json.content do
    json.extract! post.content, :url, :title, :description, :domain_name, :image
  end
else
  json.set! "content", {}
end
json.numLikes post.likes.length
json.likeText post.like_preview_text(user)
json.userLikesPost post.user_likes?(user)
