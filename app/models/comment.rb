# == Schema Information
#
# Table name: comments
#
#  id           :integer          not null, primary key
#  author_id    :integer          not null
#  post_id      :integer          not null
#  parent_id    :integer
#  body         :text             not null
#  content_type :string
#  content_id   :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Comment < ApplicationRecord

  validates :author_id, :post_id, :body, presence: true

  belongs_to :parent,
    class_name: 'Comment',
    foreign_key: :parent_id,
    optional: true

  belongs_to :author,
    class_name: 'User',
    foreign_key: :author_id

  belongs_to :post,
    class_name: 'Post',
    foreign_key: :post_id

  has_many :children,
    class_name: 'Comment',
    foreign_key: :parent_id,
    dependent: :destroy

  has_many :likes, as: :likeable

  has_many :liking_users, through: :likes, source: :liker

  # tracks comments on a post
  has_many :comment_activities, class_name: 'Activity', as: :activity_source, dependent: :destroy

  # tracks activities on a comment
  has_many :activities_on_comment, class_name: 'Activity', as: :activity_parent, dependent: :destroy


  after_create :create_activity

  def create_activity
    if self.parent_id.nil?
      activity_parent = self.post
    else
      activity_parent = self.parent
    end
    Activity.create!(user_id: self.author_id, activity_source: self, activity_parent: activity_parent)
  end

  include ActionView::Helpers::DateHelper

  def age
    time_ago_in_words(self.created_at)
  end

  def user_likes?(user)
    liking_users.include?(user)
  end
end
