user = current_user
post = @post

json.partial! "api/posts/show", post: @post, user: user
