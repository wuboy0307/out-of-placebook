# == Schema Information
#
# Table name: urls
#
#  id          :integer          not null, primary key
#  url         :string           not null
#  title       :text
#  description :text
#  image       :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Url < ApplicationRecord

  has_many :posts, as: :content

  def domain_name
    self.url.scan(URI.regexp).first.compact[1]
  end
end
