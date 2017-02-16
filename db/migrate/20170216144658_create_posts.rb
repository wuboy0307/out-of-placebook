class CreatePosts < ActiveRecord::Migration[5.0]
  def change
    create_table :posts do |t|
      t.integer :wall_id, null: false
      t.integer :author_id, null: false
      t.integer :parent_id
      t.text :body
      t.references :content, polymorphic: true, index: true

      t.timestamps
    end
    add_index :posts, :wall_id
    add_index :posts, :author_id
    add_index :posts, :parent_id # So can calculate number of shares later
  end
end
