class Api::NotificationsController < ApplicationController

  def index
    @user = current_user
    if @user.nil?
      render json: ['Not logged in!'], status: 422
    else
      render json: { notification_count: @user.notification_count }
    end
  end

  def create
    @user = current_user
    if params[:notifications][:fetch]
      render json: @user.parse_notifications
    else
      render json: ['Error no fetch parameter'], status: 422
    end
  end
end
