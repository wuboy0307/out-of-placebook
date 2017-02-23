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
end


json.set! "posts", {} if @posts.empty?

json.posts do
  @posts.each do |post|
    json.set! post.id do
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
    elsif post.content.class.name.downcase === "post"
      json.content do
        json.partial! 'api/profiles/show', post: post.content, user: user
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
          json.authorAvatarUrl comment.author.avatar.url(:xxs)
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
                  json.authorAvatarUrl child.author.avatar.url(:xxxs)
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
  end
end
