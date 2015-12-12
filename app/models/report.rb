require 'pry'
class Report < ActiveRecord::Base
	has_many :hotspots
	belongs_to :solarplant

	def self.generate_hotspots(hotspots_array, report_id)
		@hotspots_array = hotspots_array
		@report_id = report_id
		@hotspots_array.split(';').each do |hotspot|
			@array = hotspot.split(',')
			Hotspot.create(date: @array[0], hotspot_id: @array[1], coord_x: @array[2], coord_y: @array[3], max_temp: @array[4], min_temp: @array[5], hotspot_type: @array[6], report_id: @report_id)
		end
	end
end
