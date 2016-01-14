class AddReferencesToSolarplants < ActiveRecord::Migration
  def change
  	add_column :solarplants, :client_id, :integer
  	add_index :solarplants, :client_id
  end
end
