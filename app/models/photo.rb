# == Schema Information
#
# Table name: photos
#
#  id                 :integer          not null, primary key
#  user_id            :integer          not null
#  album_id           :integer
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  image_file_name    :string
#  image_content_type :string
#  image_file_size    :integer
#  image_updated_at   :datetime
#

class Photo < ApplicationRecord

  belongs_to :author, class_name: 'User', foreign_key: :user_id
  has_many :posts, as: :content

  has_attached_file :image, styles: { photo: "200x200#", timeline: "485x", thumb: "100x100#" },default_url: "missing.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

end
