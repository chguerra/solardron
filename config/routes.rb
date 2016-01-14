Rails.application.routes.draw do
    resources :reports, only: [:new, :create, :index, :show, :update, :destroy]
    resources :solarplants, only: [:new, :create, :index, :show, :update]
    resources :clients, only: [:new, :create, :index, :show, :update]

 	get '/api/hotspots/:report_id' => 'hotspots#show'

 	root to: 'clients#main'

 	post '/advanced' => 'reports#advanced'
end
