class Api::NotificationsController < ApplicationController

  def index
    @user = current_user
    if @user.nil?
      render json: ['Not logged in!'], status: 422
    else
      render json: { notification_count: @user.notification_count }
    end
  end
end
