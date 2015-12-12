Rails.application.routes.draw do
    resources :reports, only: [:new, :create, :index, :show, :update]
end
