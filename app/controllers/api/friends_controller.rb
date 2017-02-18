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
    elsif user.outgoing_friends.include?(target_user)
      render json: ['Already requested!']
      return
    elsif user.incoming_friends.include?(target_user)
      render json: ['This person has already requested to be your friend. Maybe you meant to accept?']
      return
    elsif target_user.nil?
      render json: ['Target user does not exist!']
      return
    end

    @friendship = Friendship.new(user_id: user.id, friend_id: target_user.id)
    if @friendship.save
      # DO NOT USE BELOW LINE (DELETE WHEN DONE)
      # Friendship.create!(user_id: target_user.id, friend_id: user.id)


      render :index
    else
      render json: @friendship.errors.full_messages
    end

  end

  # NB: Always send friendship data to user where the friendship id is the one where
  # THAT user is in the user_id col.
  def update
    user = current_user
    @friendship = Friendship.find_by(user_id: params[:friend][:target_id], friend_id: user.id)
    unless user.incoming_friendships.include?(@friendship)
      render json: ["You don't have any pending requests with that id!"]
      return
    end

    case params[:friend][:type]
    when 'accept'
      @friendship.completed = true
      @friendship.save!
      Friendship.create!(user_id: user.id, friend_id: params[:friend][:target_id])
    when 'reject'
      @friendship.destroy
    else
      render json: ['Invalid request type!']
      return
    end

    render :index

  end

  def index
    render :index
  end


end
