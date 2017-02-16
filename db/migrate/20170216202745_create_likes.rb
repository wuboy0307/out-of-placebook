class CreateLikes < ActiveRecord::Migration[5.0]
  def change
    create_table :likes do |t|
      t.integer :liker_id, null: false, index: true
      t.references :likeable, null: false, polymorphic: true, index: true

      t.timestamps
    end
  end
end
