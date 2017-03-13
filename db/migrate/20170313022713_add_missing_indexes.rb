class AddMissingIndexes < ActiveRecord::Migration[5.0]
  def change
    add_index :messages, :sender_id
    add_index :messages, :channel_id
  end
end
