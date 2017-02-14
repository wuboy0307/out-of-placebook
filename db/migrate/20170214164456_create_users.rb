class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :fname, null: false
      t.string :lname, null: false
      t.string :username, null: false
      t.string :email, null: false
      t.string :session_token, null: false
      t.string :password_digest, null: false
      t.text :home
      t.text :work
      t.text :from
      t.text :intro
      t.text :description
      t.string :profile_url
      t.string :cover_url

      t.timestamps
    end
    add_index :users, :username, unique: true
    add_index :users, :email, unique: true
    add_index :users, :session_token, unique: true
  end
end
