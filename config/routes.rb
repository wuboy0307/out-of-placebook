Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "static_pages#root"
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create]
    resources :posts, only: [:create, :destroy, :update, :show]
    resources :comments, only: [:create, :destroy, :update]

    resources :likes, only: [:create]
    delete 'likes' => 'likes#destroy'

    resources :friends, only: [:create, :index]
    delete 'friends' => 'friends#destroy'
    put 'friends' => 'friends#update'

    resources :notifications, only: [:index, :create]

    resources :search, only: [:create]

    resources :newsfeed, only: [:index]

    resource :session, only: [:create, :destroy]

    resources :profiles, only: [:show]
  end
end
