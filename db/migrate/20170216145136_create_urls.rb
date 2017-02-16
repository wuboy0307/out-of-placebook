class CreateUrls < ActiveRecord::Migration[5.0]
  def change
    create_table :urls do |t|
      t.string :url, null: false
      t.text :title
      t.text :description
      t.string :image

      t.timestamps
    end
  end
end
