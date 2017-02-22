# == Schema Information
#
# Table name: channels
#
#  id          :integer          not null, primary key
#  description :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Channel < ApplicationRecord

  has_many :messages
  has_many :channel_subs

  has_many :participants, through: :channel_subs, source: :participant

end
