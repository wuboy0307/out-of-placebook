# == Schema Information
#
# Table name: users
#
#  id                 :integer          not null, primary key
#  fname              :string           not null
#  lname              :string           not null
#  email              :string           not null
#  session_token      :string           not null
#  password_digest    :string           not null
#  home               :text
#  work               :text
#  from               :text
#  intro              :text
#  description        :text
#  cover_url          :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  avatar_url         :string
#  last_fetch_time    :datetime
#  last_friend_fetch  :datetime
#  last_message_fetch :datetime
#

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
