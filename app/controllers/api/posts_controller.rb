class Api::PostsController < ApplicationController
  # ENSURE CURRENT USER AND TARGET USER ARE FRIENDS.
  def create
    user = current_user
    @post = Post.new(author_id: user.id, wall_id: params[:post][:wall_id], body: params[:post][:body])

    if @post.save
      render :create
    else
      render json: @post.errors.full_messages, status: 422
    end
  end

  def show
    @post = Post.where(id: params[:id])
    if @post
      render :show
    else
      render json: ['Post not found!']
    end
  end

  def destroy
    @post = Post.find_by(id: params[:id])
    if current_user.posts.include?(@post)
      if @post.destroy
        render json: {postId: @post.id}
      else
        render @post.errors.full_messages, status: 422
      end
    else
      render json: ['You do not have permission to delete that!'], status: 422
    end
  end

  def update
    @post = Post.find_by(id: params[:id])
    if current_user.posts.include?(@post)
      @post.body = params[:post][:body]
      if @post.save
        render :update
      else
        render json: @post.errors.full_messages, status: 422
      end
    else
      render json: ['You do not have permission to update that!'], status: 422
    end
  end

end
