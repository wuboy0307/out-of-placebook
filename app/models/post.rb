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

class Post < ApplicationRecord
  validates :wall_id, :author_id, presence: true
  validates :body, presence: true

  belongs_to :content, polymorphic: true, optional: true
  belongs_to :wall, class_name: 'User', foreign_key: :wall_id
  belongs_to :author, class_name: 'User', foreign_key: :author_id

  has_many :comments

  before_save :scan_for_url

  has_many :likes, as: :likeable

  has_many :liking_users, through: :likes, source: :liker

  include ActionView::Helpers::DateHelper

  def age
    time_ago_in_words(self.created_at)
  end

# TODO: display friend names as well.
  def like_preview_text(user)
    users_who_like_post = liking_users
    num_likers = users_who_like_post.length
    user_likes = users_who_like_post.include?(user)
    if user_likes
      if num_likers > 2
        return "You and #{num_likers - 1} others like this."
      elsif num_likers > 1
        return "You and 1 other like this."
      else
        return "You like this."
      end
    elsif num_likers > 1
      return "#{num_likers} people like this."
    elsif num_likers > 0
      return "1 person likes this."
    else
      # Below line is currently redundant (will use in newsfeed)
      return "Nobody likes this. Be the first."
    end
  end

  def user_likes?(user)
    liking_users.include?(user)
  end

  def scan_for_url
    url = self.body.slice(URI.regexp)

    if url
      new_url = Url.new
      new_url.url = url
      url_object = LinkThumbnailer.generate(url)
      new_url.title = url_object.title unless url_object.title.empty?
      new_url.description = url_object.description if url_object.description

      new_url.image = url_object.images.first.src.to_s unless url_object.images.empty?

      new_url.save!
      self.content = new_url
    end
  end


end
