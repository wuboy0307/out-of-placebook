# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
#
# User.destroy_all
#
# User.create!(fname: "Mark", lname: "Zuckerberg", email: "mark@facebook.com", password: "password")
#
# 10.times do
#   User.create!(fname: Faker::Name.first_name , lname: Faker::Name.last_name , email: Faker::Internet.email, password: "password")
# end
#
#
#
# users = User.all
# #
# # 100.times do
# #   current_user = users.sample
# #   target_user = users.sample
# #   Post.create!(wall_id: target_user.id, author_id: current_user.id, body: Faker::ChuckNorris.fact)
# # end
# #
# # posts = Post.all
# #
# # 100.times do
# #   post = posts.sample
# #   current_user = users.sample
# #   Comment.create!(author_id: current_user.id, post_id: post.id, body: Faker::Hacker.say_something_smart)
# # end
#
# comments = Comment.all
#
# 2.times do
#   100.times do
#     user = users.sample
#     comment = comments.sample
#     Comment.create!(author_id: user.id, post_id: comment.post_id, parent_id: comment.id, body: Faker::Hacker.say_something_smart)
#   end
# end
#
# users = User.all
# posts = Post.all
# comments = Comment.all
#
# 500.times do
#   activity = posts.sample
#   user = users.sample
#   l = Like.new(liker_id: user.id, likeable: activity)
#   l.save
# end
#
# 700.times do
#   activity = comments.sample
#   user = users.sample
#   l = Like.new(liker_id: user.id, likeable: activity)
#   l.save
# end

users = User.all

100.times do
  current_user = users.sample
  target_user = users.sample
  next if current_user == target_user
  f = Friendship.find_or_create_by(user_id: current_user.id, friend_id: target_user.id)
  g = Friendship.find_or_create_by(friend_id: current_user.id, user_id: target_user.id)
  f.completed = true;
  g.completed = true;
  f.save;
  g.save;
end
