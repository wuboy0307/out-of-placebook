class AddLastFetchedToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :last_fetch_time, :datetime
  end
end
