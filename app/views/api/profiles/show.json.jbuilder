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
  json.createdAt post.age
  json.body post.body
  json.parentID post.parent_id
  json.content post.content
  json.comments post.comments do |comment|
    next if comment.parent_id
    json.id comment.id
    json.authorId comment.author_id
    json.postId comment.post_id
    json.authorFullName comment.author.full_name
    json.body comment.body
    json.createdAt comment.age
    json.childComments comment.children do |child|
      json.id child.id
      json.authorId child.author_id
      json.postId child.post_id
      json.parentId child.parent_id
      json.createdAt child.age
      json.authorFullName child.author.full_name
      json.body child.body
    end
  end
end
