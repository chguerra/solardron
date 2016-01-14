class AddColumnToSolarplant < ActiveRecord::Migration
  def change
  	add_column :solarplants, :zoom, :integer
  end
end
