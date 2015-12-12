class CreateSolarplants < ActiveRecord::Migration
  def change
    create_table :solarplants do |t|
      t.float :coord_x
      t.float :coord_y
      t.string :name
      t.timestamps null: false
    end
  end
end
