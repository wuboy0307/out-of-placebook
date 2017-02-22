class Api::MessagesController < ApplicationController

  def count
    render json: {count: User.first.message_notification_count}
  end

  def index

    @channels = Channel.where(id: current_user.active_channels.map(&:channel_id))
      .includes(:messages, :channel_subs)
    # debugger
    render :index
  end

end
