class AddIndexToUsers < ActiveRecord::Migration[5.0]
  def change
    add_index :users, :fname
    add_index :users, :lname
  end
end
