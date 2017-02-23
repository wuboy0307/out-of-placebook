user = current_user

json.posts do
  @post.each do |post|
    json.partial! "api/posts/show", post: post, user: user
  end
end
