class ClientsController < ApplicationController
	def new
		@client = Client.new
	end

	def create
    	client_params = params.require(:client).permit(:name, :address)
    	@client = Client.new(client_params)

    	unless @client.save
      		render(:new)
    	else
      		redirect_to(clients_path)
    	end
  	end

  	def index
  		@clients = Client.all
  	end
    def main
      
    end
end
