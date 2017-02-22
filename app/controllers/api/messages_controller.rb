class Api::MessagesController < ApplicationController

  def count
    render json: {count: User.first.message_notification_count}
    return
  end

  def index
    @channels = Channel.where(id: current_user.active_channels.map(&:channel_id))
    render :index
    return
  end

  def show
    @messages = Channel.find_by(id: params[:id]).messages
                  .order(created_at: :desc).includes(:sender)
    if @messages
      user_sub = current_user.channel_subs.find_by(channel_id: params[:id])
      # debugger
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
  def create
    @message = Message.new(sender_id: current_user.id,
      channel_id: params[:message][:channel_id], body: params[:message][:body])
    if @message.save
      render json: @message
    else
      render json: @message.errors.full_messages
    end
  end

end
