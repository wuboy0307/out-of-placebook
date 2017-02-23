# == Schema Information
#
# Table name: users
#
#  id                  :integer          not null, primary key
#  fname               :string           not null
#  lname               :string           not null
#  email               :string           not null
#  session_token       :string           not null
#  password_digest     :string           not null
#  home                :text
#  work                :text
#  from                :text
#  intro               :text
#  description         :text
#  cover_url           :string
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  avatar_url          :string
#  last_fetch_time     :datetime
#  last_friend_fetch   :datetime
#  last_message_fetch  :datetime
#  avatar_file_name    :string
#  avatar_content_type :string
#  avatar_file_size    :integer
#  avatar_updated_at   :datetime
#  cover_file_name     :string
#  cover_content_type  :string
#  cover_file_size     :integer
#  cover_updated_at    :datetime
#

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
