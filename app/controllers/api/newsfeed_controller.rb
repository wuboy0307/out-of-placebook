class Api::NewsfeedController < ApplicationController

  def index
    user = current_user
    # user = User.first
    if user.nil?
      render json: ['Not logged in!'], status: 422
      return
    end

    @activities = user.parse_newsfeed
    render :index
  end

end
