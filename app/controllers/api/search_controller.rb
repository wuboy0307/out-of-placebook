class Api::SearchController < ApplicationController

  def create
    search_string = params[:search][:query].downcase
    render json: {} if search_string.empty?
    # debugger
    channel_id = params[:search][:channel_id]
    if channel_id
      @users = User.search_by_full_name(search_string).where.not(id: Channel.find(channel_id).participants).limit(10).includes(:friends, :friendships)
    else
      @users = User.search_by_full_name(search_string).where.not(id: current_user.id).limit(10).includes(:friends, :friendships)
    end
    # render json: @users
  end
end
