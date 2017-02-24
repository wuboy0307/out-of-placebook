class Api::LikesController < ApplicationController

  def create
    user = current_user
    @like = Like.new(liker_id: user.id)

    if params[:like][:type] == "post"
      @target = Post.find_by(id: params[:like][:content_id])
    elsif params[:like][:type] == "comment"
      @target = Comment.find_by(id: params[:like][:content_id])
    end

    if @target.liking_users.include?(user)
      render json: ['ERROR! Already liked!'], status: 422
      return
    end

    @like.likeable = @target

    if @like.save
      if params[:like][:type] == "post"
        Pusher.trigger("notifications-#{@target.wall_id}", 'new-notification', {sender: user.id})
        Pusher.trigger("notifications-#{@target.author_id}", 'new-notification', {sender: user.id})

        Pusher.trigger("wall-notifications-#{@target.wall_id}", 'activity', {id: @target.id, sender: user.id})
        render json: { type: 'post', postId: @target.id}
      elsif params[:like][:type] == "comment"
        Pusher.trigger("notifications-#{@target.author_id}", 'new-notification', {sender: user.id})

        Pusher.trigger("wall-notifications-#{@target.post.wall_id}", 'activity', {id: @target.post_id, sender: user.id})
        render json: { type: 'comment', commentId: @target.id,
          parentId: @target.parent_id, postId: @target.post_id}
      end
    else
      render json: @like.errors.full_messages, status: 422
    end
  end

  def destroy
    user = current_user

    if params[:like][:type] == "post"
      @target = Post.find_by(id: params[:like][:content_id])
    elsif params[:like][:type] == "comment"
      @target = Comment.find_by(id: params[:like][:content_id])
    end

    unless @target.liking_users.include?(user)
      render json: ['ERROR! You have not liked this!'], status: 422
      return
    end

    @like = @target.likes.find_by(liker_id: user.id)

    if @like.destroy
      if params[:like][:type] == "post"
        Pusher.trigger("wall-notifications-#{@target.wall_id}", 'activity', {id: @target.id, sender: user.id})

        render json: { type: 'post', postId: @target.id}

      elsif params[:like][:type] == "comment"
        Pusher.trigger("wall-notifications-#{@target.post.wall_id}", 'activity', {id: @target.post_id, sender: user.id})

        render json: { type: 'comment', commentId: @target.id,
          parentId: @target.parent_id, postId: @target.post_id}
      end
    else
      render json: @like.errors.full_messages, status: 422
    end

  end
end
