# == Schema Information
#
# Table name: comments
#
#  id           :integer          not null, primary key
#  author_id    :integer          not null
#  post_id      :integer          not null
#  parent_id    :integer
#  body         :text
#  content_type :string
#  content_id   :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

require 'test_helper'

class CommentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
