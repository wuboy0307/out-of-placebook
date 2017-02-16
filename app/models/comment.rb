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
    foreign_key: :parent_id

  has_many :likes, as: :likeable

  has_many :liking_users, through: :likes, source: :liker

  include ActionView::Helpers::DateHelper

  def age
    time_ago_in_words(self.created_at)
  end
end
