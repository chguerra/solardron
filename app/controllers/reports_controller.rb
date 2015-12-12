require 'pry'

class ReportsController < ApplicationController
  def new
    @solarplants = Solarplant.all
  end
  def create
    @solarplant_id = params[:solarplant_id]
    @dron_input = params[:dron_input]
    @report = Report.create(date: params[:date], solarplant_id: @solarplant_id)
    Report.generate_hotspots(@dron_input, @report.id)
    @hotspots = Hotspot.where(report_id: @report.id)
    binding.pry
  end
  private
  def report_params
    params.require(:report).permit(:date)
  end
end
