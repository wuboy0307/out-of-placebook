class Api::ProfilesController < ApplicationController

  def show
    @user = User.find_by(id: params[:id])
    if @user
      @posts = Post.where(wall_id: @user.id).includes(:content, :author, :comments, :likes).reverse
      render :show
    else
      render json: ['User not found!']
    end
  end

end
