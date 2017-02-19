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

class Activity < ApplicationRecord
  belongs_to :activity_source, polymorphic: true
  belongs_to :activity_parent, polymorphic: true
  belongs_to :user
end
