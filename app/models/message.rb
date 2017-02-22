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
#

class Message < ApplicationRecord

  belongs_to :sender, class_name: 'User', foreign_key: :sender_id
  belongs_to :thread, class_name: 'Thread', foreign_key: :thread_id

end
