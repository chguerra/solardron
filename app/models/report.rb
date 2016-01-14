require 'pry'
class Report < ActiveRecord::Base
	has_many :hotspots
	belongs_to :solarplant

	def self.generate_hotspots(hotspots_array, report_id)
		@hotspots_array = hotspots_array
		@report_id = report_id
		@hotspots_array.split(';').each do |hotspot|
			@array = hotspot.split(',')
			Hotspot.create(date: @array[0], hotspot_id: @array[1], coord_x: @array[2], coord_y: @array[3], max_temp: @array[4], min_temp: @array[5], hotspot_type: @array[6], report_id: @report_id, hidden: @array[7])
		end
	end

	def self.custom_report_generator(form_array, reportid)
		result = []
		hotspotids = form_array.split(',')
		Hotspot.all.each do |hotspot|
			hotspotids.each do |hotspotarray_id|
				if hotspot.hotspot_id.to_i == hotspotarray_id.to_i && hotspot.report_id.to_i == reportid.to_i 
					result << hotspot
				end
			end
		end
		return result
	end
end
