# == Schema Information
#
# Table name: urls
#
#  id          :integer          not null, primary key
#  url         :string           not null
#  title       :text
#  description :text
#  image       :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'test_helper'

class UrlTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
