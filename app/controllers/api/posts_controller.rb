class Api::PostsController < ApplicationController
  # ENSURE CURRENT USER AND TARGET USER ARE FRIENDS.
  def create
    user = current_user
    @post = Post.new(author_id: user.id, wall_id: params[:post][:wall_id], body: params[:post][:body])

    if @post.save
      render :create
    else
      render json: @post.errors.full_messages
    end
    
  end

end
