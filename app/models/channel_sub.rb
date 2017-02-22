# == Schema Information
#
# Table name: channel_subs
#
#  id             :integer          not null, primary key
#  participant_id :integer          not null
#  channel_id     :integer          not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class ChannelSub < ApplicationRecord

  belongs_to :participant, class_name: 'User', foreign_key: :participant_id
  belongs_to :channel, class_name: 'Channel', foreign_key: :channel_id

end
