# == Schema Information
#
# Table name: posts
#
#  id           :integer          not null, primary key
#  wall_id      :integer          not null
#  author_id    :integer          not null
#  parent_id    :integer
#  body         :text
#  content_type :string
#  content_id   :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

require 'test_helper'

class PostTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
