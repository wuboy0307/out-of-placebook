class Api::PhotosController < ApplicationController

  def create
    user = current_user
    if params[:profile][:image].nil?
      render json: ['No image given'], status: 422
      return
    end
    user.avatar = params[:profile][:image]
    if user.save
      render json: ['Profile picture successfully updated!']
    else
      render json: user.errors.full_messages
    end

  end

end
