require 'pry'
class SolarplantsController < ApplicationController
	def new
		@solarplant = Solarplant.new
		@clients = Client.all
	end

	def create
		@solarplant = Client.find(params[:client_id]).solarplants.create(name: params[:solarplant_name], coord_x: params[:coord_x], coord_y: params[:coord_y], zoom: params[:zoom])
		render :show
	end

	def show
		@solarplant = Solarplant.find(params[:id])
	end

	def index
		@solarplants = Solarplant.all
	end

	private
	def solarplant_params
		params.require(:solarplant).permit(:coord_x, :coord_y, :name)
	end
end
