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
# 1000.times do
#   User.create!(fname: Faker::Name.first_name , lname: Faker::Name.last_name , email: Faker::Internet.email, password: "password")
# end


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
#
# users = User.all

# 1000.times do
#   current_user = users.sample
#   target_user = users.sample
#   next if current_user == target_user
#   f = Friendship.find_or_create_by(user_id: current_user.id, friend_id: target_user.id)
#   g = Friendship.find_or_create_by(friend_id: current_user.id, user_id: target_user.id)
#   f.completed = true;
#   g.completed = true;
#   f.save;
#   g.save;
# end

# 500.times do
#   current_user = users.sample
#   target_user = users.sample
#   next if current_user == target_user
#   Message.create!(sender_id: current_user.id, receiver_id: target_user.id, body: Faker::ChuckNorris.fact)
# end
#
# 20.times do
#   Channel.create!
# end
#
# channels = Channel.all
#
# 50.times do
#   u1 = users.sample
#   channel = channels.sample
#   ChannelSub.find_or_create_by(participant_id: u1.id, channel_id: channel.id)
# end
#
# 500.times do
#   u = users.sample
#   c = u.channels.sample
#   next if c.nil?
#   Message.create!(sender_id: u.id, channel_id: c.id, body: Faker::Hacker.say_something_smart)
# end

def own_posts(user, text_array)
  text_array.reverse.each do |post|
    Post.create!(wall_id: user.id, author_id: user.id, body: post)
  end
end


# ---- DONALD TRUMP
donald = User.find_by(fname: "Donald", lname: "Trump", email: "donald@whitehouse.gov")#, password: tinyhands, intro: "Nobody knows how to run a country better than me. Believe me. I know the best people. We're going to MAKE AMERICA GREAT AGAIN.")
# User.create!(fname: "Mark", lname: "Zuckerberg", email: "mark@facebook.com", password: "password")


donald_own_posts = ["MAKE AMERICA GREAT AGAIN",
  "The FBI is totally unable to stop the national security 'leakers' that have permeated our government for a long time.
They can't even find the leakers within the FBI itself. Classified information is being given to media that could have a devastating effect on U.S. FIND NOW",
"BUILD THAT WALL http://www.breitbart.com/big-government/2017/02/23/report-religious-leaders-creating-underground-railroad-to-hide-illegal-aliens/",
"Heading to Joint Base Andrews on #MarineOne with Prime Minister Shinzō earlier today.",
"Seven people shot and killed yesterday in Chicago. What is going on there - totally out of control. Chicago needs help!",
"CONFIDENTIAL NUCLEAR FOOTBALL CODE: 3AASJKS8234278942ACS",
"MAKE AMERICA GREAT AGAIN",
"ON THIS DAY...
Raising the Flag on Iwo Jima is a photograph taken on February 23, 1945, by Joe Rosenthal. It depicts six United States Marines raising a U.S. flag atop Mount Suribachi, during the Battle of Iwo Jima in World War II....https://en.m.wikipedia.org/wiki/Raising_the_Flag_on_Iwo_Jima",
"#Repost Ivanka Trump via Instagram:
・・・
Arabella and I visited the Supreme Court this morning and attended a hearing. I'm grateful for the opportunity to teach her about the judicial system in our country firsthand. #SCOTUS #SupremeCourt #ImportantLessons #MotherDaughter",
"No more wasted money! We must do a lot more with less, and look for every last dollar of savings. Unfortunately, the budget that we’re essentially inheriting, is a mess. The finances of our country are a mess - with the national debt at $20 TRILLION (doubling over the last eight years.)
Washington cannot ignore this - we need to address it immediatley, and that's exactly what we are going to do!",
"The so-called angry crowds in home districts of some Republicans are actually, in numerous cases, planned out by liberal activists. Sad!",
"MAKE AMERICA GREAT AGAIN."]
# own_posts(donald, donald_own_posts)


sean_own_posts = ["You nailed it. Period! https://twitter.com/TheOnion/status/825546280034201600",
"Inauguration Day: @realDonaldTrump to become America's 45th president
@AP
http://bigstory.ap.org/article/c0a8b0d6a3244d7cbcb6dd294232fb56/inauguration-day-trump-become-americas-45th-president … #Inauguration #DonaldTrumpInauguration",
"password12",
]
own_posts(donald, sean_own_posts)
