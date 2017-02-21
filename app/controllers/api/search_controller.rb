class Api::SearchController < ApplicationController

  def create
    search_string = params[:search][:query].downcase
    render json: {} if search_string.empty?

    @users = User.search_by_full_name(search_string).where.not(id: current_user.id).limit(10).includes(:friends, :friendships)
    # render json: @users
  end
end
