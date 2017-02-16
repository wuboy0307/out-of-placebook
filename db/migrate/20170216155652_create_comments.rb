class CreateComments < ActiveRecord::Migration[5.0]
  def change
    create_table :comments do |t|
      t.integer :author_id, null: false
      t.integer :post_id, null: false
      t.integer :parent_id
      t.text :body, null: false
      t.references :content, polymorphic: true, index: true

      t.timestamps
    end
    add_index :comments, :author_id
    add_index :comments, :post_id
    add_index :comments, :parent_id
  end
end
