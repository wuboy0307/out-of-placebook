class Changeindexonacitvities < ActiveRecord::Migration[5.0]
  def change
    remove_index :activities, :user_id
    remove_index :activities, :created_at
    add_index :activities, [:user_id, :created_at]
    add_index :activities, [:activity_parent_id, :activity_source_type, :activity_parent_type, :created_at], name: 'activity_index'
  end
end
