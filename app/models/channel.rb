# == Schema Information
#
# Table name: channels
#
#  id          :integer          not null, primary key
#  description :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Channel < ApplicationRecord

  has_many :messages
  has_many :channel_subs

  has_many :participants, through: :channel_subs, source: :participant

  def channel_description
    self.description || "Group chat with #{participants.length - 1} others."
  end

  def self.find_channel_given_users(user_one, user_two)
    Channel.joins(sql_joins)
      .where('(uone.id = ? and utwo.id = ?) OR (uone.id = ? and utwo.id = ?)',
        user_one, user_two, user_two, user_one)
      .distinct
      .last
  end

  def join_times
    self.channel_subs.order(created_at: :asc)
  end

  def parse_messages
    self.messages.order(created_at: :desc)#.includes(:sender)
  end

  def sql
    sql = "inner join
      channel_subs on channels.id = channel_subs.channel_id
    inner join
      users on channel_subs.participant_id = users.id"


  end

  private

  def self.sql_joins
    sql = "inner join
      (select COUNT(users.id), channels.id from channels
      inner join
        channel_subs on channels.id = channel_subs.channel_id
      inner join
        users on channel_subs.participant_id = users.id
      group by channels.id
      having COUNT(users) = 2) direct_channels
    on channels.id = direct_channels.id
    inner join
      channel_subs csone on direct_channels.id = csone.channel_id
    inner join
      users uone on csone.participant_id = uone.id
    inner join
      channel_subs cstwo on direct_channels.id = cstwo.channel_id
    inner join
      users utwo on cstwo.participant_id = utwo.id"
    sql
  end

end
