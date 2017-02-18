class Api::FriendsController < ApplicationController

  def create
    user = current_user
    target_user = User.find_by(id: params[:friend][:target_id])

    if user == target_user
      render json: ['Cannot friend yourself!']
      return
    elsif user.friends.include?(target_user)
      render json: ['Already friends!']
      return
    elsif user.pending_friends.include?(target_user)
      render json: ['Already requested!']
      return
    elsif target_user.nil?
      render json: ['Target user does not exist!']
      return
    end

    @friendship = Friendship.new(user_id: user.id, friend_id: target_user.id)
    if @friendship.save
      # DO NOT USE BELOW LINE (DELETE WHEN DONE)
      # Friendship.create!(user_id: target_user.id, friend_id: user.id)

      
      # render jbuilder showing current requests and current friends
    else
      render json: @friendship.errors.full_messages
    end

  end

  # NB: Always send friendship data to user where the friendship id is the one where
  # THAT user is in the user_id col.
  def update
    user = current_user
    @friendship = Friendship.find_by(id: params[:friend][:request_id])
    unless user.all_friendships.include?(@friendship)
      render json: ["You don't have any pending requests with that id!"]
      return
    end

    case params[:friend][:type]
    when 'friend'
      opposite_friendship = Friendship.find_by(friend_id: @friendship.user_id, user_id: @friendship.friend_id)
      @friendship.completed = true
      opposite_friendship.completed = true
      @friendship.save!
      opposite_friendship.save!
    when 'unfriend'
      opposite_friendship = Friendship.find_by(friend_id: @friendship.user_id, user_id: @friendship.friend_id)
      @friendship.destroy
      opposite_friendship.destroy
    else
      render json: ['Invalid request type!']
      return
    end
    # render jbuilder showing current requests and current friends

  end

  def index
    render :index
  end


end
