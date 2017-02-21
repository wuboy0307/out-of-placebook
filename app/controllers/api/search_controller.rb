class Api::SearchController < ApplicationController

  def create
    search_string = params[:search][:query].downcase
    render json: {} if search_string.empty?

    @users = User.search_by_full_name(search_string).includes(:friends)
    # render json: @users
  end
end
