# == Schema Information
#
# Table name: channel_subs
#
#  id              :integer          not null, primary key
#  participant_id  :integer          not null
#  channel_id      :integer          not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  last_fetch_time :datetime
#

class ChannelSub < ApplicationRecord

  belongs_to :participant, class_name: 'User', foreign_key: :participant_id
  belongs_to :channel, class_name: 'Channel', foreign_key: :channel_id
  validates :participant_id, uniqueness: { scope: :channel_id, message: 'User already belongs to channel!'}

  after_create :create_join_message
  after_destroy :create_leave_message

  def num_unseen
    channel.messages.where('created_at > ?', self.last_fetch_time).length
  end

  def create_join_message
    Message.create!(sender_id: self.participant_id,
      channel_id: self.channel_id,
      body: "#{self.participant.full_name} joined.",
      event: true)
  end

  def create_leave_message
    Message.create!(sender_id: self.participant_id,
      channel_id: self.channel_id,
      body: "#{self.participant.full_name} left.",
      event: true)
  end

end
