class Api::MessagesController < ApplicationController

  def count
    u = current_user
    render json: {count: u.message_notification_count}
    u.last_message_fetch = Time.now
    u.save
    return
  end

  def index
    @channels = current_user.active_channels.map{|channel| Channel.find(channel.channel.id)}
    render :index
    return
  end

  def create_or_find
    @channel = Channel.find_channel_given_users(current_user.id,
      params[:channel][:user_id])
    if @channel.nil?
      @channel = Channel.create!
      ChannelSub.create!(participant_id: current_user.id, channel_id: @channel.id)
      ChannelSub.create!(participant_id: params[:channel][:user_id], channel_id: @channel.id)
    end
    raise 'error' if @channel.participants.length != 2
    @messages = @channel.messages
    @channel_text = @channel.participants.where.not(id: current_user).first.full_name

    user_sub = current_user.channel_subs.find_by(channel_id: @channel.id)
    user_sub.last_fetch_time = Time.now

    if user_sub.save
      render :show
    else
      render json: ['Error saving last fetch time'], status: 422
    end
  end

  def add_user
    @channel = Channel.find(params[:channel][:channel_id].to_i)
    user_to_add = User.find(params[:channel][:user_id].to_i)
    if @channel.nil? || user_to_add.nil?
      render json: ["Could not finder user or channel"], status: 422
      return
    end

    if @channel.participants.include?(user_to_add)
      render json: ["User is already in the channel"], status: 422
      return
    end

    @channel_sub = ChannelSub.new(participant_id: user_to_add.id,
      channel_id: @channel.id)
    if @channel_sub.save
      @channel.participants.map(&:id).each do |id|
        Pusher.trigger("notifications-#{id}", 'new-message-notification', {})
        Pusher.trigger("notifications-#{id}", "new-message-#{@channel.id}", {})
      end
    else
      render json: ['Error creating channel sub'], status: 422
    end
  end

  def show
    @channel = Channel.find_by(id: params[:id])
    @messages = @channel.parse_messages
    if @channel.participants.length > 2
      @channel_text = @channel.channel_description
    else
      @channel_text = @channel.participants.where.not(id: current_user).first.full_name
    end


    if @messages
      user_sub = current_user.channel_subs.find_by(channel_id: params[:id])
      user_sub.last_fetch_time = Time.now
      if user_sub.save
        render :show
      else
        render json: ['Error saving last fetch time'], status: 422
      end
    else
      render json: ['Error finding channel'], status: 422
    end
  end

  # TODO: check if subbed before creating
  def update
    @message = Message.new(sender_id: current_user.id,
      channel_id: params[:message][:channel_id], body: params[:message][:body])

    if @message.save
      user_sub = current_user
                  .channel_subs.find_by(channel_id: @message.channel_id)
      user_sub.last_fetch_time = Time.now
      user_sub.save!

      u = current_user
      u.last_message_fetch = Time.now
      u.save

      # send pusher notifications
      @message.channel.participants.map(&:id).each do |id|
        next if id == u.id
        Pusher.trigger("notifications-#{id}", 'new-message-notification', {})
        Pusher.trigger("notifications-#{id}", "new-message-#{@message.channel_id}", {})
      end

      render :update
    else
      render json: @message.errors.full_messages
    end
  end

end
