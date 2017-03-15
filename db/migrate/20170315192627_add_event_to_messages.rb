class AddEventToMessages < ActiveRecord::Migration[5.0]
  def change
    add_column :messages, :event, :boolean, default: false
  end
end
