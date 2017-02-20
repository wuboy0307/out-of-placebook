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

  has_many :comments, dependent: :destroy

  has_many :likes, as: :likeable
  has_many :liking_users, through: :likes, source: :liker

  # tracks posts on a wall
  has_many :post_activities, class_name: 'Activity', as: :activity_source, dependent: :destroy

  # tracks activities on a post
  has_many :activities_on_post, class_name: 'Activity', as: :activity_parent, dependent: :destroy

  before_save :scan_for_url

  after_create :create_activity

  def create_activity
    Activity.create!(user_id: self.author_id, activity_source: self, activity_parent: self.wall)
  end

  include ActionView::Helpers::DateHelper

  def age
    time_ago_in_words(self.created_at)
  end

# TODO: display friend names as well.
  def like_preview_text(user)
    likers_excluding_user = liking_users.reject{ |u| u.id == user.id }
    num_likers_excluding_user = likers_excluding_user.length

    case num_likers_excluding_user
    when 0
      return nil
    when 1
      return likers_excluding_user.map { |user| "#{user.full_name} "}.join() + "likes this."
    when 2
      return likers_excluding_user.map { |user| "#{user.full_name}"}.join(" and ") + " like this."
    when 3
      return likers_excluding_user.take(2).map { |user| "#{user.full_name}"}
        .join(", ") + " and #{num_likers_excluding_user - 2} other like this."
    else
      return likers_excluding_user.take(2).map { |user| "#{user.full_name}"}
        .join(", ") + " and #{num_likers_excluding_user - 2} others like this."
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
