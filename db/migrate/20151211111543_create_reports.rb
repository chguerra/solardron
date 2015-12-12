class CreateReports < ActiveRecord::Migration
  def change
    create_table :reports do |t|
	     t.datetime :date
       t.references :solarplant, index: true
       t.timestamps null: false
    end
  end
end
