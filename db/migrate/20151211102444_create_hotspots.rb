class CreateHotspots < ActiveRecord::Migration
  def change
    create_table :hotspots do |t|
      t.references :report, index: true
      t.integer :date
      t.integer :hotspot_id
      t.float :coord_x
      t.float :coord_y
      t.float :max_temp
      t.float :min_temp
      t.integer :hotspot_type
      t.timestamps null: false
    end
  end
end
