# == Schema Information
#
# Table name: friendships
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  friend_id  :integer          not null
#  completed  :boolean          default("false")
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Friendship < ApplicationRecord

  validates :user_id, :friend_id, presence: true

  # below lines can mess up seeds as it prevents multiple friendships
  validates :user_id, uniqueness: { scope: :friend_id, message: 'Already friends!'}
  validates :friend_id, uniqueness: { scope: :user_id, message: 'Already friends!'}

  belongs_to :user,
    class_name: 'User',
    foreign_key: :user_id

  belongs_to :friend,
    class_name: 'User',
    foreign_key: :friend_id

  has_many :incoming, class_name: 'Friendship', primary_key: :user_id, foreign_key: :friend_id, dependent: :delete_all

  after_save :create_activity

  def create_activity
    return unless self.completed
    Activity.create!(user_id: self.user_id, activity_source: self, activity_parent: self.friend)
  end
end
