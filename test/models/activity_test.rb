# == Schema Information
#
# Table name: activities
#
#  id                   :integer          not null, primary key
#  user_id              :integer          not null
#  activity_source_type :string           not null
#  activity_source_id   :integer          not null
#  activity_parent_type :string           not null
#  activity_parent_id   :integer          not null
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#

require 'test_helper'

class ActivityTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
