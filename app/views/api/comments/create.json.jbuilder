comment = @comment
user = @user

json.id comment.id
json.authorId comment.author_id
json.postId comment.post_id
json.parentId comment.parent_id
json.authorFullName user.full_name
json.authorAvatarUrl user.avatar.url(:xxs)
json.userLikesComment false
json.body comment.body
json.createdAt comment.age
json.numLikes 0
