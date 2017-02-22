class AddingColsToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :last_friend_fetch, :datetime
    add_column :users, :last_message_fetch, :datetime
  end
end
