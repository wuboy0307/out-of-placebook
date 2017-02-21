user = current_user
post = @post

json.set! post.id do
json.id post.id
json.wallId post.wall_id
json.authorId post.author_id
json.authorFullName post.author.full_name
json.authorAvatarUrl post.author.avatar_url
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
json.comments do
  post.comments.each do |comment|
    json.set! comment.id do
      next if comment.parent_id
      json.id comment.id
      json.authorId comment.author_id
      json.postId comment.post_id
      json.authorFullName comment.author.full_name
      json.authorAvatarUrl post.author.avatar_url
      json.userLikesComment comment.user_likes?(user)
      json.body comment.body
      json.createdAt comment.age
      json.numLikes comment.likes.length
      json.childComments do
          comment.children.each do |child|
            json.set! child.id do
              json.id child.id
              json.authorId child.author_id
              json.authorFullName child.author.full_name
              json.authorAvatarUrl post.author.avatar_url
              json.userLikesComment child.user_likes?(user)
              json.postId child.post_id
              json.parentId child.parent_id
              json.createdAt child.age
              json.numLikes child.likes.length
              json.body child.body
            end
          end
        end
      end
    end
  end
end
