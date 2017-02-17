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
        render json: { type: 'post', postId: @target.id}
      elsif params[:like][:type] == "comment"
        render json: { type: 'comment', commentId: @target.id,
          parentId: @target.parent_id, postId: @target.post_id}
      end
    else
      render json: @like.errors.full_messages, status: 422
    end
  end

  def destroy
  end
end
