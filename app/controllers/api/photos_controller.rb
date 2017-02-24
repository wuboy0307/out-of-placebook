class Api::PhotosController < ApplicationController

  def create
    user = current_user
    if params[:profile][:image].nil? && params[:profile][:cover].nil?
      render json: ['No image given'], status: 422
      return
    end
    if params[:profile][:image]
      user.avatar = params[:profile][:image]
    elsif params[:profile][:cover]
      user.cover = params[:profile][:cover]
    end
    if user.save
      render json: ['Profile picture successfully updated!']
    else
      render json: user.errors.full_messages
    end

  end

end
