class Api::NotificationsController < ApplicationController

  def index
    @user = current_user
    @user = User.first
    render json: { notification_count: @user.notification_count }
  end
end
