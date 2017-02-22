class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.integer :sender_id, null: false
      t.integer :channel_id, null: false
      t.text :body

      t.timestamps
    end

    create_table :channels do |t|
      t.string :description
      t.timestamps
    end

    create_table :channel_subs do |t|
      t.integer :participant_id, null: false
      t.integer :channel_id, null: false
      t.timestamps
    end
    add_index :channel_subs, :participant_id
    add_index :channel_subs, :channel_id
  end
end
