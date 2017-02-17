# == Schema Information
#
# Table name: likes
#
#  id            :integer          not null, primary key
#  liker_id      :integer          not null
#  likeable_type :string           not null
#  likeable_id   :integer          not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Like < ApplicationRecord
  belongs_to :likeable, polymorphic: true
  belongs_to :liker, class_name: 'User', foreign_key: :liker_id

  # below line can mess with seed file as it prevents multiple likes
  validates :liker_id, uniqueness: { scope: [:likeable_type, :likeable_id], message: 'Already Liked!'}
end
