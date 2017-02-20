# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  fname           :string           not null
#  lname           :string           not null
#  email           :string           not null
#  session_token   :string           not null
#  password_digest :string           not null
#  home            :text
#  work            :text
#  from            :text
#  intro           :text
#  description     :text
#  cover_url       :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  avatar_url      :string
#  last_fetch_time :datetime
#

class User < ApplicationRecord

	attr_reader :password

	validates :session_token, presence: true, uniqueness: true
  validates :password_digest, presence: { message: "Password can't be blank" }
  validates :fname, presence: { message: "First Name can't be blank" }
  validates :lname, presence: { message: "Last Name can't be blank" }
  validates :email, presence: { message: "Email address can't be blank" }, uniqueness: true
	validates :password, length: {minimum: 6, allow_nil: :true}

	after_initialize :ensure_session_token
	before_validation :ensure_session_token_uniqueness

  has_many :friendships, -> { where completed: true },
    class_name: 'Friendship',
    foreign_key: :user_id

  has_many :outgoing_friendships, -> { where completed: false },
    class_name: 'Friendship',
    foreign_key: :user_id

  has_many :incoming_friendships, -> { where completed: false },
    class_name: 'Friendship',
    foreign_key: :friend_id

  # Used to ensure both rows are deleted when user is deleted.
  has_many :all_friendships,
    class_name: 'Friendship',
    foreign_key: :user_id,
    dependent: :destroy

  has_many :frienderships,
    class_name: 'Friendship',
    foreign_key: :friend_id,
    dependent: :destroy

  has_many :friends,
    through: :friendships,
    source: :friend

  has_many :outgoing_friends,
    through: :outgoing_friendships,
    source: :friend

  has_many :incoming_friends,
    through: :incoming_friendships,
    source: :user

  has_many :comments,
    class_name: 'Comment',
    foreign_key: :author_id,
    dependent: :destroy

  # COULD POTENTIALLY DO 'HAS MANY COMMENTED-ON-POSTS THROUGH COMMENTS??'
  has_many :commented_on_posts,
    through: :comments,
    source: :post

  has_many :posts,
    class_name: 'Post',
    foreign_key: :author_id,
    dependent: :destroy

	has_many :activities, dependent: :destroy

  has_many :wall_posts,
    class_name: 'Post',
    foreign_key: :wall_id

  has_many :likes, class_name: 'Like', foreign_key: :liker_id, dependent: :destroy

  has_many :liked_posts, through: :likes, source: :likeable, source_type: 'Post'
  has_many :liked_comments, through: :likes, source: :likeable, source_type: 'Comment'

  # Add index on [source type, parent type, parent id, created at] AND [user_id, created_at]
  def generate_notifications(last_search_time)
    output = []
    base_notification_query(last_search_time, 'Like', 'Post', self.posts)
      .map{|act| output << [act, 'like_on_your_post']}

      base_notification_query(last_search_time, 'Comment', 'Post', self.posts)
      .map{|act| output << [act, 'comment_on_your_post']}

    base_notification_query(last_search_time, 'Like', 'Post', self.wall_posts)
      .map{|act| output << [act, 'like_on_your_wall_post']}

      base_notification_query(last_search_time, 'Comment', 'Post', self.wall_posts)
      .map{|act| output << [act, 'comment_on_your_wall_post']}

    base_notification_query(last_search_time, 'Like', 'Comment', self.comments)
      .map{|act| output << [act, 'like_on_your_comment']}

      base_notification_query(last_search_time, 'Comment', 'Comment', self.comments)
      .map{|act| output << [act, 'comment_on_your_comment']}

    # base_notification_query(last_search_time, 'Comment', 'Post', self.commented_on_posts)
    #   .map{|act| output << [act, 'comment_on_your_commented_post']}

    output.uniq!{|el| el[0].id }
    output.sort!{|x, y| y[0].id <=> x[0].id }
    output
  end

  def created_time_for_n_notifications(n)
    first = Activity.joins(join_sql)
      .where(activity_source_type: ['Comment','Like'])
      .where(activity_parent_type: ['Post'])
      .where(activity_parent_id: self.wall_posts + self.posts)
      .order(created_at: :desc)

    second = Activity.joins(join_sql)
      .where(activity_source_type: ['Comment','Like'])
      .where(activity_parent_type: ['Comment'])
      .where(activity_parent_id: self.comments)
      .order(created_at: :desc)

    first.or(second).order(created_at: :desc)[0..n].last.created_at
    end

  def notification_count
    generate_notifications(self.last_fetch_time).length - generate_notifications(Time.now).length
  end

  def parse_notifications
    unparsed_notifcations = generate_notifications(Time.now)
  end

  def base_notification_query(last_search_time, source_type, parent_type, parent_id)
    Activity.joins(join_sql)
      .where('created_at > ?', last_search_time)
      .where(activity_source_type: source_type)
      .where(activity_parent_type: parent_type)
      .where(activity_parent_id: parent_id)
      .order(created_at: :desc)
  end

	def subscribed_posts
		posts << wall_posts << liked_posts << commented_on_posts
	end

  def friend_ids
    friendships.map(&:id)
  end

  def full_name
    "#{fname} #{lname}"
  end

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return nil unless user
    user.password_is?(password) ? user : nil
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64(16)
  end

	def password=(password)
		self.password_digest = BCrypt::Password.create(password)
		@password = password
	end

	def password_is?(password)
		BCrypt::Password.new(self.password_digest).is_password?(password)
	end

	def reset_session_token!
		self.session_token = self.class.generate_session_token
		ensure_session_token_uniqueness
		self.save!
		self.session_token
	end

	private

	def ensure_session_token
		self.session_token ||= self.class.generate_session_token
	end

	def ensure_session_token_uniqueness
		while User.find_by(session_token: self.session_token)
			self.session_token = self.class.generate_session_token
		end
	end

  def join_sql
    sql = "INNER JOIN
        (SELECT activity_source_type, activity_parent_type, activity_parent_id, MAX(created_at) as maxcreated
        FROM activities
        WHERE activities.user_id != #{self.id}
        GROUP BY activity_source_type, activity_parent_type, activity_parent_id) groupedact
    ON activities.activity_source_type = groupedact.activity_source_type
    AND activities.activity_parent_type = groupedact.activity_parent_type
    AND activities.activity_parent_id = groupedact.activity_parent_id
    AND activities.created_at = groupedact.maxcreated"
    sql
  end

end
