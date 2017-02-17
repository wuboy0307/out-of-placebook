class Api::CommentsController < ApplicationController

  def create
    @comment = Comment.new(author_id: current_user.id,
      post_id: params[:comment][:post_id], parent_id: params[:comment][:parent_id],
      body: params[:comment][:body])
    if @comment.save
      render json: @comment
    else
      render json: @comment.errors.full_messages
    end

  end
end
