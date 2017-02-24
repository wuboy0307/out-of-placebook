class Api::PostsController < ApplicationController
  # ENSURE CURRENT USER AND TARGET USER ARE FRIENDS.
  def create
    user = current_user
    # debugger
    @post = Post.new(author_id: user.id, wall_id: params[:post][:wall_id], body: params[:post][:body])
    # debugger
    if params[:post][:content_id].to_i > 0
      @post.content = Post.find(params[:post][:content_id].to_i)
    elsif params[:post][:image] != "null"
      @photo = Photo.create!(user_id: user.id, image: params[:post][:image])
      @post.content = @photo
    end
    if @post.save
      @user = User.find(params[:post][:wall_id])
      Pusher.trigger("notifications-#{@post.wall_id}", 'new-notification', {sender: user.id})
      Pusher.trigger("wall-notifications-#{@post.wall_id}", 'activity', {id: @post.id, sender: user.id})

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
    user = current_user
    @post = Post.find_by(id: params[:id])
    if user.posts.include?(@post)
      if @post.destroy
        Pusher.trigger("wall-notifications-#{@post.wall_id}", 'delete-post', {id: @post.id, sender: user.id})
        render json: {postId: @post.id}
      else
        render @post.errors.full_messages, status: 422
      end
    else
      render json: ['You do not have permission to delete that!'], status: 422
    end
  end

  def update
    user = current_user
    @post = Post.find_by(id: params[:id])
    if user.posts.include?(@post)
      @post.body = params[:post][:body]
      if @post.save
        Pusher.trigger("wall-notifications-#{@post.wall_id}", 'activity', {id: @post.id, sender: user.id})

        render :update
      else
        render json: @post.errors.full_messages, status: 422
      end
    else
      render json: ['You do not have permission to update that!'], status: 422
    end
  end

  # todo
  def get_likes
    @post = Post.find_by(params[:post][:post_id])
  end

end
