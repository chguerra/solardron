class AddShowColumnToHotspots < ActiveRecord::Migration
  def change
  	add_column :hotspots, :hidden, :integer
  end
end
