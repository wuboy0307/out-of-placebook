class Api::PostsController < ApplicationController
  # ENSURE CURRENT USER AND TARGET USER ARE FRIENDS.
  def create
    @post = Post.new()
  end

end
