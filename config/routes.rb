Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "static_pages#root"
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create]
    resources :posts, only: [:create, :destroy, :update, :show]
    resources :comments, only: [:create, :destroy, :update]

    get 'posts/:id/likes' => 'posts#get_likes'
    resources :likes, only: [:create]
    delete 'likes' => 'likes#destroy'

    get 'friends/count' => 'friends#count'
    delete 'friends' => 'friends#destroy'
    put 'friends' => 'friends#update'
    resources :friends, only: [:create, :index]

    resources :notifications, only: [:index, :create]

    get 'messages/count' => 'messages#count'
    post 'messages' => 'messages#create_or_find'
    post 'messages/add_user' => 'messages#add_user'
    resources :messages, only: [:index, :show, :update]

    resources :photos, only: [:create]

    resources :search, only: [:create]

    resources :newsfeed, only: [:index]

    resource :session, only: [:create, :destroy]

    resources :profiles, only: [:show]
  end
end
