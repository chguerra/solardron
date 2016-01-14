require 'pry'

class ReportsController < ApplicationController
  skip_before_filter :verify_authenticity_token
  def new
    @solarplants = Solarplant.all
  end
  def index
    @solarplants = Solarplant.all
  end
  def show
    @solarplants = Solarplant.find_by(id: Report.find(params[:id]).solarplant_id)
    @report = Report.find(params[:id])
  end
  def create
    @solarplant_id = params[:solarplant_id]
    @dron_input = params[:dron_input]
    @report = Report.create(date: params[:date], solarplant_id: @solarplant_id)
    Report.generate_hotspots(@dron_input, @report.id)
    @hotspots = Hotspot.where(report_id: @report.id)
    @solarplants = Solarplant.find(params[:solarplant_id])
    render :show
  end
  def advanced
    @hotspots = Report.custom_report_generator(params[:hotspotarray], params[:reportid])
  end
  private
  def report_params
    params.require(:report).permit(:date)
  end
end
