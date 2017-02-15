class Api::ProfilesController < ApplicationController

  def show
    @user = User.find_by(id: params[:id])
    if @user
      render :show
    else
      render json: ['User not found!']
    end
  end

end
