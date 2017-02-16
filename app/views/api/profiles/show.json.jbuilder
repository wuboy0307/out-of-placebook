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
  json.authorAvatarUrl post.author.avatar_url
  json.createdAt post.age
  json.body post.body
  json.parentID post.parent_id
  json.content post.content
  json.contentType post.content.class.name.downcase
  json.numLikes post.likes.length
  json.likeText post.like_preview_text(current_user)
  json.userLikesPost post.user_likes?(current_user)
  json.comments post.comments do |comment|
    next if comment.parent_id
    json.id comment.id
    json.authorId comment.author_id
    json.postId comment.post_id
    json.authorFullName comment.author.full_name
    json.authorAvatarUrl post.author.avatar_url
    json.body comment.body
    json.createdAt comment.age
    json.numLikes comment.likes.length
    json.childComments comment.children do |child|
      json.id child.id
      json.authorId child.author_id
      json.authorFullName child.author.full_name
      json.authorAvatarUrl post.author.avatar_url
      json.postId child.post_id
      json.parentId child.parent_id
      json.createdAt child.age
      json.numLikes child.likes.length
      json.body child.body
    end
  end
end
