class HotspotsController < ApplicationController
	def show
		@hotspots = Report.find(params[:report_id]).hotspots
		render :json => @hotspots
	end
end
