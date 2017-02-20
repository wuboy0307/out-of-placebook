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

end
