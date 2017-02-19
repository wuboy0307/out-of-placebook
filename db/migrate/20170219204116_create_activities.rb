class CreateActivities < ActiveRecord::Migration[5.0]
  def change
    create_table :activities do |t|
      t.integer :user_id, null: false, index: true
      t.references :activity_source, polymorphic: true, index: true, null: false
      t.references :activity_parent, polymorphic: true, index: true, null: false

      t.timestamps
    end
    add_index :activities, :created_at

  end
end
