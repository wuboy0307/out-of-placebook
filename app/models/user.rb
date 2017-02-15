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
#  profile_url     :string
#  cover_url       :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
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

  has_many :friendships,
    class_name: 'Friendship',
    foreign_key: :user_id

  has_many :friends,
    through: :friendships,
    source: :friend

  def friend_ids
    friendships.map(&:id)
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
