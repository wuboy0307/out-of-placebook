# == Schema Information
#
# Table name: users
#
#  id                  :integer          not null, primary key
#  fname               :string           not null
#  lname               :string           not null
#  email               :string           not null
#  session_token       :string           not null
#  password_digest     :string           not null
#  home                :text
#  work                :text
#  from                :text
#  intro               :text
#  description         :text
#  cover_url           :string
#  created_at          :datetime         not null
#  updated_at          :datetime         not null
#  avatar_url          :string
#  last_fetch_time     :datetime
#  last_friend_fetch   :datetime
#  last_message_fetch  :datetime
#  avatar_file_name    :string
#  avatar_content_type :string
#  avatar_file_size    :integer
#  avatar_updated_at   :datetime
#  cover_file_name     :string
#  cover_content_type  :string
#  cover_file_size     :integer
#  cover_updated_at    :datetime
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

	has_many :messages, class_name: 'Message', foreign_key: :sender_id

	has_many :channel_subs, class_name: 'ChannelSub', foreign_key: :participant_id, dependent: :destroy
	has_many :channels, through: :channel_subs, source: :channel

  has_many :likes, class_name: 'Like', foreign_key: :liker_id, dependent: :destroy

  has_many :liked_posts, through: :likes, source: :likeable, source_type: 'Post'
  has_many :liked_comments, through: :likes, source: :likeable, source_type: 'Comment'

	has_many :photos

  include PgSearch

  pg_search_scope :search_by_full_name, :against => [:fname, :lname],
                  :using => {
                    # :tsearch => {:prefix => true},
                    :trigram => {
                      :threshold => 0.1,
                    }
                  }

	has_attached_file :avatar, styles: { profile: "160x160#", friend: "100x100#", header: "24x24#", xs: "48x48#", xxs: "32x32#", xxxs: "20x20#" }, default_url: "avatar.jpg"
	validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/
	has_attached_file :cover, styles: { cover: "850x313#" }, default_url: "coverphoto.jpg"
	validates_attachment_content_type :cover, content_type: /\Aimage\/.*\Z/


  def generate_notifications(last_search_time)
    output = []
    wall_posts.where('created_at > ?', last_search_time).where.not(author_id: self.id).includes(:liking_users, :content, :author, :likes,
    comments: [:author, :likes, :liking_users,
    children: [:author, :likes, :liking_users]]).map{|act| output << [act, 'post_on_your_wall']}
    # base_notification_query(last_search_time, 'Post', 'User', self.id).includes(activity_source: [:author])
    #   .map{|act| output << [act, 'post_on_your_wall']}

    base_notification_query(last_search_time, 'Like', 'Post', self.posts).includes(activity_parent: [:liking_users, :content, :author, :likes,
    comments: [:author, :likes, :liking_users,
    children: [:author, :likes, :liking_users]]], activity_source: [:liker, :likeable])
      .map{|act| output << [act, 'like_on_your_post']}

    base_notification_query(last_search_time, 'Comment', 'Post', self.posts).includes(activity_parent: [:liking_users, :content, :author, :likes,
    comments: [:author, :likes, :liking_users,
    children: [:author, :likes, :liking_users]]], activity_source: [:author])
    .map{|act| output << [act, 'comment_on_your_post']}

    base_notification_query(last_search_time, 'Like', 'Post', self.wall_posts).includes(activity_parent: [:liking_users, :content, :author, :likes,
    comments: [:author, :likes, :liking_users,
    children: [:author, :likes, :liking_users]]], activity_source: [:liker, :likeable])
      .map{|act| output << [act, 'like_on_your_wall_post']}

    base_notification_query(last_search_time, 'Comment', 'Post', self.wall_posts).includes(activity_parent: [:liking_users, :content, :author, :likes,
    comments: [:author, :likes, :liking_users,
    children: [:author, :likes, :liking_users]]], activity_source: [:author])
    .map{|act| output << [act, 'comment_on_your_wall_post']}

    base_notification_query(last_search_time, 'Like', 'Comment', self.comments).includes(activity_parent: [:author, :likes], activity_source: [:liker, :likeable])
      .map{|act| output << [act, 'like_on_your_comment']}

    base_notification_query(last_search_time, 'Comment', 'Comment', self.comments).includes(activity_parent: [:author, :likes], activity_source: [:author])
    .map{|act| output << [act, 'comment_on_your_comment']}

    base_notification_query(last_search_time, 'Comment', 'Post', self.commented_on_posts).includes(activity_parent: [:liking_users, :content, :author, :likes,
    comments: [:author, :likes, :liking_users,
    children: [:author, :likes, :liking_users]]], activity_source: [:author])
      .map{|act| output << [act, 'comment_on_your_commented_post']}

    output.uniq!{|el| el[0].id }
    output.sort_by!{|el| el[0].created_at}.reverse!
    # output.sort!{|x, y| y[0].id <=> x[0].id }
    output
  end

  def created_time_for_n_notifications(n)
    first = Activity.joins(join_sql)
      .where(activity_parent_id: self.wall_posts + self.posts)
      .where(activity_source_type: ['Comment','Like'])
      .where(activity_parent_type: ['Post'])
      .order(created_at: :desc)

    second = Activity.joins(join_sql)
      .where(activity_parent_id: self.comments)
      .where(activity_source_type: ['Comment','Like'])
      .where(activity_parent_type: ['Comment'])
      .order(created_at: :desc)
		return [] if first.empty? && second.empty?
    first.or(second).order(created_at: :desc).limit(n).last.created_at
  end

  def generate_n_notifications(n)
    last_activity_time = created_time_for_n_notifications(n)
    generate_notifications(last_activity_time)[0..n]
  end

  def notification_count
    generate_notifications(self.last_fetch_time).length
  end

  def parse_notifications
    unparsed_notifications = generate_n_notifications(10)
    parsed = []
    unparsed_notifications.each do |note, message|
      case message
      when "post_on_your_wall"
        parsed << ["#{note.author.full_name} posted on your wall.", note.age, note.author.avatar.url(:xs), note.id]
      when "like_on_your_post"
        num_likes_minus_self = note.activity_parent.likes.where.not(liker_id: self.id).length
        case num_likes_minus_self
        when 1
          parsed << ["#{note.activity_source.liker.full_name} likes your post.", note.age, note.activity_source.liker.avatar.url(:xs), note.activity_parent.id]
        when 2
          parsed << ["#{note.activity_source.liker.full_name} and 1 other like your post.", note.age, note.activity_source.liker.avatar.url(:xs), note.activity_parent.id]
        else
          parsed << ["#{note.activity_source.liker.full_name} and #{num_likes_minus_self - 1} others like your post.", note.age, note.activity_source.liker.avatar.url(:xs), note.activity_parent.id]
        end

      when "comment_on_your_post"
        num_comments_minus_self = note.activity_parent.comments.where.not(author_id: self.id).length
        case num_comments_minus_self
        when 1
          parsed << ["#{note.activity_source.author.full_name} commented on your post.", note.age, note.activity_source.author.avatar.url(:xs), note.activity_parent.id]
        when 2
          parsed << ["#{note.activity_source.author.full_name} and 1 other also commented on your post.", note.age, note.activity_source.author.avatar.url(:xs), note.activity_parent.id]
        else
          parsed << ["#{note.activity_source.author.full_name} and #{num_comments_minus_self - 1} others commented on your post.", note.age, note.activity_source.author.avatar.url(:xs), note.activity_parent.id]
        end

      when "like_on_your_wall_post"
        num_likes_minus_self = note.activity_parent.likes.where.not(liker_id: self.id).length
        case num_likes_minus_self
        when 1
          parsed << ["#{note.activity_source.liker.full_name} likes a post on your wall.", note.age, note.activity_source.liker.avatar.url(:xs), note.activity_parent.id]
        when 2
          parsed << ["#{note.activity_source.liker.full_name} and 1 other like a post on your wall.", note.age, note.activity_source.liker.avatar.url(:xs), note.activity_parent.id]
        else
          parsed << ["#{note.activity_source.liker.full_name} and #{num_likes_minus_self - 1} others like a post on your wall.", note.age, note.activity_source.liker.avatar.url(:xs), note.activity_parent.id]
        end

      when "comment_on_your_wall_post"
        num_comments_minus_self = note.activity_parent.comments.where.not(author_id: self.id).length
        case num_comments_minus_self
        when 1
          parsed << ["#{note.activity_source.author.full_name} commented on a post on your wall.", note.age, note.activity_source.author.avatar.url(:xs), note.activity_parent.id]
        when 2
          parsed << ["#{note.activity_source.author.full_name} and 1 other also commented on a post on your wall.", note.age, note.activity_source.author.avatar.url(:xs), note.activity_parent.id]
        else
          parsed << ["#{note.activity_source.author.full_name} and #{num_comments_minus_self - 1} others commented on a post on your wall.", note.age, note.activity_source.author.avatar.url(:xs), note.activity_parent.id]
        end

      when "like_on_your_comment"
        num_likes_minus_self = note.activity_parent.likes.where.not(liker_id: self.id).length
        case num_likes_minus_self
        when 1
          parsed << ["#{note.activity_source.liker.full_name} likes your comment", note.age, note.activity_source.liker.avatar.url(:xs), note.activity_parent.post_id]
        when 2
          parsed << ["#{note.activity_source.liker.full_name} and 1 other like your comment", note.age, note.activity_source.liker.avatar.url(:xs), note.activity_parent.post_id]
        else
          parsed << ["#{note.activity_source.liker.full_name} and #{num_likes_minus_self - 1} others like your comment", note.age, note.activity_source.liker.avatar.url(:xs), note.activity_parent.post_id]
        end

      when "comment_on_your_comment"
        parsed << ["#{note.activity_source.author.full_name} replied to your comment.", note.age, note.activity_source.author.avatar.url(:xs), note.activity_parent.post_id]

      when "comment_on_your_commented_post"
        num_comments_minus_self = note.activity_parent.comments.where.not(author_id: self.id).length
        case num_comments_minus_self
        when 1
          parsed << ["#{note.activity_source.author.full_name} also commented on #{note.activity_parent.author.full_name}'s post.", note.age, note.activity_source.author.avatar.url(:xs), note.activity_parent.id]
        when 2
          parsed << ["#{note.activity_source.author.full_name} and 1 other also commented on #{note.activity_parent.author.full_name}'s post.", note.age, note.activity_source.author.avatar.url(:xs), note.activity_parent.id]
        else
          parsed << ["#{note.activity_source.author.full_name} and #{num_comments_minus_self - 1} others also commented on #{note.activity_parent.author.full_name}'s post.", note.age, note.activity_source.author.avatar.url(:xs), note.activity_parent.id]
        end

      end
    end
    parsed
  end

  def base_notification_query(last_search_time, source_type, parent_type, parent_id)
    Activity.joins(join_sql)
      .where(activity_parent_id: parent_id)
      .where(activity_source_type: source_type)
      .where(activity_parent_type: parent_type)
      .where('created_at >= ?', last_search_time)
      .order(created_at: :desc).includes(:activity_parent, :activity_source)
  end

  # TODO: Add in friendship activity to newsfeed later on
  # Can filter parents further if considering privacy (parent post.author in self.friends)
  def newsfeed_activity
    Activity.joins(join_sql_friends_activity)
      .where(user_id: self.friends)
      .where.not('activities.activity_source_type = ? AND activities.activity_parent_type = ?', 'Like', 'Comment')
      .where.not(activity_source_type: 'Friendship')
      .limit(20)
      .order(created_at: :desc)
  end

  def parse_newsfeed
    # can add .limit to limit here
    # also add created_at constraint
    output = []
    activity_types = []
    activity_types << newsfeed_activity.where(activity_source_type: "Post")
                        .includes(:activity_parent, activity_source: [:liking_users, :content, :author, :likes,
                        comments: [:author, :likes, :liking_users,
                        children: [:author, :likes, :liking_users]]])
    activity_types << newsfeed_activity.where(activity_parent_type: "Post")
                        .includes(:activity_source, activity_parent: [:liking_users, :content, :author, :likes,
                        comments: [:author, :likes, :liking_users,
                        children: [:author, :likes, :liking_users]]])
    activity_types << newsfeed_activity.where(activity_parent_type: "Comment")
                        .includes(:activity_source, activity_parent: [post: [:liking_users, :content, :author, :likes, comments: [:author, :likes, :liking_users,
                        children: [:author, :likes, :liking_users]]]])
    activity_types.each do |activity|
      activity.each do |act|
        case [act.activity_source_type, act.activity_parent_type]
        when ["Post", "User"]
          output << [act.activity_source, nil]
        when ["Like", "Post"]
          output << [act.activity_parent, "#{act.activity_source.author.full_name} likes this."]
        when ["Comment", "Post"]
          output << [act.activity_parent, "#{act.activity_source.author.full_name} commented this."]
        when ["Comment", "Comment"]
          output << [act.activity_parent.post, "#{act.activity_source.author.full_name} commented on this."]
        end
      end
    end
    output
  end


  def friend_ids
    friendships.map(&:friend_id)
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
		self.save!
		self.session_token
	end

	def active_channels
		Message.select('messages.channel_id, MAX(messages.created_at)')
			.joins('INNER JOIN channels ON messages.channel_id = channels.id')
			.where(channel_id: self.channels)
			.group('messages.channel_id')
			.order('MAX(messages.created_at) desc')
	end

	def message_notification_count
		active_channels.having('MAX(messages.created_at) > ?', self.last_message_fetch).length
	end

	def friend_notification_count
		incoming_friends.where('friendships.updated_at > ?', self.last_friend_fetch).length
	end

	private

	def ensure_session_token
		self.session_token ||= self.class.generate_session_token
	end

  def join_sql
    sql = "INNER JOIN
        (SELECT activity_source_type, activity_parent_type, activity_parent_id, MAX(created_at) as maxcreated
        FROM activities
        WHERE activities.user_id != #{self.id}
        GROUP BY activity_source_type, activity_parent_type, activity_parent_id) groupedact
		ON activities.activity_parent_id = groupedact.activity_parent_id
    AND activities.activity_source_type = groupedact.activity_source_type
    AND activities.activity_parent_type = groupedact.activity_parent_type
    AND activities.created_at = groupedact.maxcreated"
    sql
  end

  def join_sql_friends_activity
    sql = "INNER JOIN
        (SELECT activity_parent_type, activity_parent_id, MAX(created_at) as maxcreated
        FROM activities
        GROUP BY activity_parent_type, activity_parent_id) groupedact
		ON activities.activity_parent_id = groupedact.activity_parent_id
    AND activities.activity_parent_type = groupedact.activity_parent_type
    AND activities.created_at = groupedact.maxcreated"
    sql
  end

end
