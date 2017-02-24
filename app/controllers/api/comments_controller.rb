class Api::CommentsController < ApplicationController

  def create
    @user = current_user
    @comment = Comment.new(author_id: @user.id,
      post_id: params[:comment][:post_id], parent_id: params[:comment][:parent_id],
      body: params[:comment][:body])
    if @comment.save

      Pusher.trigger("notifications-#{@comment.post.author_id}", 'new-notification', {sender: @user.id})
      Pusher.trigger("notifications-#{@comment.post.wall_id}", 'new-notification', {sender: @user.id})

      Pusher.trigger("wall-notifications-#{@comment.post.wall_id}", 'activity', {id: @comment.post_id, sender: @user.id})

      unless @comment.parent_id.nil?
        Pusher.trigger("notifications-#{@comment.parent.author_id}", 'new-notification', {sender: @user.id})
      end
      # push to everyone else who's commented on post
      @comment.post.comments.map(&:author_id).uniq.each do |author_id|
        Pusher.trigger("notifications-#{author_id}", 'new-notification', {sender: @user.id})
      end

      render :create
    else
      render json: @comment.errors.full_messages
    end

  end
end
