# == Schema Information
#
# Table name: messages
#
#  id         :integer          not null, primary key
#  sender_id  :integer          not null
#  channel_id :integer          not null
#  body       :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  event      :boolean          default("false")
#

class Message < ApplicationRecord

  belongs_to :sender, class_name: 'User', foreign_key: :sender_id
  belongs_to :channel, class_name: 'Channel', foreign_key: :channel_id


  include ActionView::Helpers::DateHelper

  def age
    time_ago_in_words(self.created_at)
  end
end
