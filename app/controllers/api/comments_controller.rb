class Api::CommentsController < ApplicationController

  def create
    @user = current_user
    @comment = Comment.new(author_id: @user.id,
      post_id: params[:comment][:post_id], parent_id: params[:comment][:parent_id],
      body: params[:comment][:body])
    if @comment.save
      render :create
    else
      render json: @comment.errors.full_messages
    end

  end
end
