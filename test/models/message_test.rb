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

require 'test_helper'

class MessageTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
