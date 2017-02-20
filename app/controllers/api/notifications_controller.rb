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
    render json: ['Not logged in!'], status: 422 if @user.nil?

    if params[:notifications][:fetch]
      @user.last_fetch_time = Time.now
      if @user.save
        render json: { list: @user.parse_notifications, notification_count: 0}
      else
        render json: ['Error saving new fetch time for user!'], status: 422
      end
    else
      render json: ['Error no fetch parameter'], status: 422
    end
  end
end
