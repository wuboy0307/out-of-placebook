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
if post.content.class.name.downcase === "url"
  json.content do
    json.extract! post.content, :url, :title, :description, :domain_name, :image
  end
elsif post.content.class.name.downcase === "post"
  json.content do
    json.partial! 'api/profiles/show', post: post.content, user: user
  end
else
  json.set! "content", {}
end
json.contentType post.content.class.name.downcase
json.numLikes post.likes.length
json.likeText post.like_preview_text(user)
json.userLikesPost post.user_likes?(user)
