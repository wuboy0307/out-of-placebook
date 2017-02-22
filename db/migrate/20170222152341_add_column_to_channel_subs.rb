class AddColumnToChannelSubs < ActiveRecord::Migration[5.0]
  def change
    add_column :channel_subs, :last_fetch_time, :datetime
  end
end
